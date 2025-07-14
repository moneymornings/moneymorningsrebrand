from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Money Mornings API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Money Mornings Application Form Models
class ApplicationSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    business_name: Optional[str] = None
    service_interest: str  # businessType in frontend
    funding_amount: Optional[str] = None
    time_in_business: Optional[str] = None
    submission_date: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"  # pending, contacted, qualified, approved, rejected
    notes: Optional[str] = None

class ApplicationSubmissionCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    business_name: Optional[str] = None
    service_interest: str
    funding_amount: Optional[str] = None
    time_in_business: Optional[str] = None

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Money Mornings API - Ready to serve!"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Money Mornings Application Endpoints
@api_router.post("/applications/submit", response_model=ApplicationSubmission)
async def submit_application(application: ApplicationSubmissionCreate):
    """Submit a new Money Mornings application"""
    try:
        # Create application object with auto-generated ID and timestamp
        app_data = application.dict()
        app_obj = ApplicationSubmission(**app_data)
        
        # Insert into database
        result = await db.applications.insert_one(app_obj.dict())
        
        if result.inserted_id:
            logger.info(f"New application submitted: {app_obj.email}")
            return app_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to save application")
            
    except Exception as e:
        logger.error(f"Error submitting application: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/applications", response_model=List[ApplicationSubmission])
async def get_applications(
    status: Optional[str] = Query(None, description="Filter by status"),
    limit: int = Query(100, description="Number of applications to return"),
    skip: int = Query(0, description="Number of applications to skip")
):
    """Get all application submissions with optional filtering"""
    try:
        # Build query filter
        query_filter = {}
        if status:
            query_filter["status"] = status
        
        # Get applications from database
        cursor = db.applications.find(query_filter).sort("submission_date", -1).skip(skip).limit(limit)
        applications = await cursor.to_list(length=limit)
        
        return [ApplicationSubmission(**app) for app in applications]
        
    except Exception as e:
        logger.error(f"Error retrieving applications: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/applications/{application_id}", response_model=ApplicationSubmission)
async def get_application(application_id: str):
    """Get a specific application by ID"""
    try:
        application = await db.applications.find_one({"id": application_id})
        
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        return ApplicationSubmission(**application)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving application {application_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/applications/{application_id}", response_model=ApplicationSubmission)
async def update_application(application_id: str, update_data: ApplicationUpdate):
    """Update application status and notes"""
    try:
        # Prepare update data
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        
        if not update_dict:
            raise HTTPException(status_code=400, detail="No update data provided")
        
        # Update the application
        result = await db.applications.update_one(
            {"id": application_id},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Application not found")
        
        # Return updated application
        updated_app = await db.applications.find_one({"id": application_id})
        return ApplicationSubmission(**updated_app)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating application {application_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/applications/stats/summary")
async def get_application_stats():
    """Get application submission statistics"""
    try:
        total_applications = await db.applications.count_documents({})
        pending_applications = await db.applications.count_documents({"status": "pending"})
        qualified_applications = await db.applications.count_documents({"status": "qualified"})
        approved_applications = await db.applications.count_documents({"status": "approved"})
        
        # Get recent submissions (last 7 days)
        seven_days_ago = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        seven_days_ago = seven_days_ago.replace(day=seven_days_ago.day - 7)
        
        recent_applications = await db.applications.count_documents({
            "submission_date": {"$gte": seven_days_ago}
        })
        
        return {
            "total_applications": total_applications,
            "pending_applications": pending_applications,
            "qualified_applications": qualified_applications,
            "approved_applications": approved_applications,
            "recent_applications_7_days": recent_applications
        }
        
    except Exception as e:
        logger.error(f"Error getting application stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Dashboard HTML (Simple interface to view applications)
@app.get("/admin", response_class=HTMLResponse)
async def admin_dashboard():
    """Simple admin dashboard to view applications"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Money Mornings - Admin Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        </style>
    </head>
    <body class="bg-gray-100">
        <div class="min-h-screen">
            <header class="bg-green-600 text-white shadow-lg">
                <div class="max-w-7xl mx-auto px-4 py-6">
                    <h1 class="text-3xl font-bold">Money Mornings Empire - Admin Dashboard</h1>
                    <p class="text-green-100 mt-2">Manage application submissions</p>
                </div>
            </header>
            
            <main class="max-w-7xl mx-auto px-4 py-8">
                <div id="stats" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <!-- Stats will be loaded here -->
                </div>
                
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-900">Recent Applications</h2>
                        <div class="mt-2 flex space-x-4">
                            <button onclick="loadApplications('all')" class="text-sm bg-green-500 text-white px-3 py-1 rounded">All</button>
                            <button onclick="loadApplications('pending')" class="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Pending</button>
                            <button onclick="loadApplications('qualified')" class="text-sm bg-blue-500 text-white px-3 py-1 rounded">Qualified</button>
                            <button onclick="loadApplications('approved')" class="text-sm bg-green-600 text-white px-3 py-1 rounded">Approved</button>
                        </div>
                    </div>
                    <div id="applications" class="p-6">
                        <!-- Applications will be loaded here -->
                    </div>
                </div>
            </main>
        </div>
        
        <script>
            // Load application statistics
            async function loadStats() {
                try {
                    const response = await fetch('/api/applications/stats/summary');
                    const stats = await response.json();
                    
                    document.getElementById('stats').innerHTML = `
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold text-gray-900">Total Applications</h3>
                            <p class="text-3xl font-bold text-green-600">${stats.total_applications}</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold text-gray-900">Pending</h3>
                            <p class="text-3xl font-bold text-yellow-600">${stats.pending_applications}</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold text-gray-900">Qualified</h3>
                            <p class="text-3xl font-bold text-blue-600">${stats.qualified_applications}</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold text-gray-900">Approved</h3>
                            <p class="text-3xl font-bold text-green-600">${stats.approved_applications}</p>
                        </div>
                    `;
                } catch (error) {
                    console.error('Error loading stats:', error);
                }
            }
            
            // Load applications
            async function loadApplications(status = 'all') {
                try {
                    const url = status === 'all' ? '/api/applications' : `/api/applications?status=${status}`;
                    const response = await fetch(url);
                    const applications = await response.json();
                    
                    let html = '';
                    if (applications.length === 0) {
                        html = '<p class="text-gray-500 text-center py-8">No applications found.</p>';
                    } else {
                        html = `
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funding</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                        `;
                        
                        applications.forEach(app => {
                            const statusColor = {
                                'pending': 'bg-yellow-100 text-yellow-800',
                                'qualified': 'bg-blue-100 text-blue-800',
                                'approved': 'bg-green-100 text-green-800',
                                'rejected': 'bg-red-100 text-red-800'
                            }[app.status] || 'bg-gray-100 text-gray-800';
                            
                            html += `
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${app.first_name} ${app.last_name}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <a href="mailto:${app.email}" class="text-blue-600 hover:text-blue-800">${app.email}</a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${app.service_interest.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${app.funding_amount || 'N/A'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}">
                                            ${app.status}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${new Date(app.submission_date).toLocaleDateString()}
                                    </td>
                                </tr>
                            `;
                        });
                        
                        html += `
                                    </tbody>
                                </table>
                            </div>
                        `;
                    }
                    
                    document.getElementById('applications').innerHTML = html;
                } catch (error) {
                    console.error('Error loading applications:', error);
                    document.getElementById('applications').innerHTML = '<p class="text-red-500 text-center py-8">Error loading applications.</p>';
                }
            }
            
            // Load data on page load
            window.onload = function() {
                loadStats();
                loadApplications();
            };
            
            // Refresh data every 30 seconds
            setInterval(() => {
                loadStats();
                loadApplications();
            }, 30000);
        </script>
    </body>
    </html>
    """
    return html_content

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
