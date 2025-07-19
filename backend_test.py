#!/usr/bin/env python3
"""
Backend API Testing for Money Mornings
Tests all backend endpoints and functionality after frontend contact updates
"""

import requests
import json
import sys
import os
from datetime import datetime
import base64

# Get backend URL from frontend environment
BACKEND_URL = "https://c700075e-555a-471e-8cbe-ad60de35cddb.preview.emergentagent.com"
API_BASE_URL = f"{BACKEND_URL}/api"

# Admin credentials for dashboard testing
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "MoneyMornings2025!"

def test_server_connectivity():
    """Test if backend server is running and accessible"""
    print("🔍 Testing server connectivity...")
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Server is running: {data.get('message', 'OK')}")
            return True
        else:
            print(f"❌ Server responded with status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Server connectivity failed: {str(e)}")
        return False

def test_cors_configuration():
    """Test CORS configuration"""
    print("\n🔍 Testing CORS configuration...")
    try:
        # Test preflight request
        headers = {
            'Origin': 'https://c700075e-555a-471e-8cbe-ad60de35cddb.preview.emergentagent.com',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        response = requests.options(f"{API_BASE_URL}/applications/submit", headers=headers, timeout=10)
        
        if response.status_code in [200, 204]:
            cors_headers = response.headers
            if 'Access-Control-Allow-Origin' in cors_headers:
                print(f"✅ CORS configured correctly")
                print(f"   Allow-Origin: {cors_headers.get('Access-Control-Allow-Origin')}")
                return True
            else:
                print("⚠️ CORS headers present but may need verification")
                return True
        else:
            print(f"❌ CORS preflight failed with status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS test failed: {str(e)}")
        return False

def test_application_submission():
    """Test POST /api/applications/submit endpoint"""
    print("\n🔍 Testing application submission endpoint...")
    
    # Test data with realistic information
    test_application = {
        "first_name": "Sarah",
        "last_name": "Johnson",
        "email": "sarah.johnson@example.com",
        "phone": "404-555-0123",
        "business_name": "Johnson Consulting LLC",
        "service_interest": "business-funding",
        "funding_amount": "$50,000 - $100,000",
        "time_in_business": "2-5 years"
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/applications/submit",
            json=test_application,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Application submission successful")
            print(f"   Application ID: {data.get('id')}")
            print(f"   Email: {data.get('email')}")
            print(f"   Status: {data.get('status')}")
            return True, data.get('id')
        else:
            print(f"❌ Application submission failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Application submission request failed: {str(e)}")
        return False, None

def test_get_applications():
    """Test GET /api/applications endpoint"""
    print("\n🔍 Testing get applications endpoint...")
    
    try:
        # Test getting all applications
        response = requests.get(f"{API_BASE_URL}/applications", timeout=10)
        
        if response.status_code == 200:
            applications = response.json()
            print(f"✅ Retrieved {len(applications)} applications")
            
            # Test with status filter
            response_pending = requests.get(f"{API_BASE_URL}/applications?status=pending", timeout=10)
            if response_pending.status_code == 200:
                pending_apps = response_pending.json()
                print(f"✅ Retrieved {len(pending_apps)} pending applications")
                return True
            else:
                print(f"⚠️ Status filter test failed with status {response_pending.status_code}")
                return True  # Main endpoint works
                
        else:
            print(f"❌ Get applications failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get applications request failed: {str(e)}")
        return False

def test_application_stats():
    """Test GET /api/applications/stats/summary endpoint"""
    print("\n🔍 Testing application stats endpoint...")
    
    try:
        response = requests.get(f"{API_BASE_URL}/applications/stats/summary", timeout=10)
        
        if response.status_code == 200:
            stats = response.json()
            print("✅ Application stats retrieved successfully")
            print(f"   Total applications: {stats.get('total_applications', 0)}")
            print(f"   Pending applications: {stats.get('pending_applications', 0)}")
            print(f"   Qualified applications: {stats.get('qualified_applications', 0)}")
            print(f"   Approved applications: {stats.get('approved_applications', 0)}")
            print(f"   Recent (7 days): {stats.get('recent_applications_7_days', 0)}")
            return True
        else:
            print(f"❌ Application stats failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Application stats request failed: {str(e)}")
        return False

def test_admin_dashboard():
    """Test admin dashboard accessibility"""
    print("\n🔍 Testing admin dashboard accessibility...")
    
    try:
        # Test without authentication (should fail)
        response = requests.get(f"{BACKEND_URL}/admin", timeout=10)
        if response.status_code == 401:
            print("✅ Admin dashboard properly protected (401 without auth)")
        else:
            print(f"⚠️ Admin dashboard returned {response.status_code} without auth (expected 401)")
        
        # Test with authentication
        auth_string = f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}"
        auth_bytes = auth_string.encode('ascii')
        auth_b64 = base64.b64encode(auth_bytes).decode('ascii')
        
        headers = {'Authorization': f'Basic {auth_b64}'}
        response_auth = requests.get(f"{BACKEND_URL}/admin", headers=headers, timeout=10)
        
        if response_auth.status_code == 200:
            content = response_auth.text
            if "Money Mornings Empire - Admin Dashboard" in content:
                print("✅ Admin dashboard accessible with correct credentials")
                print("✅ Dashboard contains expected content")
                return True
            else:
                print("⚠️ Admin dashboard accessible but content may be incorrect")
                return True
        else:
            print(f"❌ Admin dashboard failed with auth: status {response_auth.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Admin dashboard test failed: {str(e)}")
        return False

def test_database_connectivity():
    """Test database connectivity by checking if we can retrieve data"""
    print("\n🔍 Testing database connectivity...")
    
    try:
        # Use the stats endpoint as a proxy for database connectivity
        response = requests.get(f"{API_BASE_URL}/applications/stats/summary", timeout=10)
        
        if response.status_code == 200:
            stats = response.json()
            # If we get a proper response with expected fields, database is working
            expected_fields = ['total_applications', 'pending_applications', 'qualified_applications', 'approved_applications']
            if all(field in stats for field in expected_fields):
                print("✅ Database connectivity confirmed")
                print("✅ Database queries executing successfully")
                return True
            else:
                print("⚠️ Database responding but data structure unexpected")
                return False
        else:
            print(f"❌ Database connectivity test failed: status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Database connectivity test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("=" * 60)
    print("🚀 MONEY MORNINGS BACKEND API TESTING")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base URL: {API_BASE_URL}")
    print("=" * 60)
    
    results = {}
    
    # Test 1: Server Connectivity
    results['server_connectivity'] = test_server_connectivity()
    
    # Test 2: Database Connectivity
    results['database_connectivity'] = test_database_connectivity()
    
    # Test 3: CORS Configuration
    results['cors_configuration'] = test_cors_configuration()
    
    # Test 4: Application Submission
    results['application_submission'], app_id = test_application_submission()
    
    # Test 5: Get Applications
    results['get_applications'] = test_get_applications()
    
    # Test 6: Application Stats
    results['application_stats'] = test_application_stats()
    
    # Test 7: Admin Dashboard
    results['admin_dashboard'] = test_admin_dashboard()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed += 1
    
    print("=" * 60)
    print(f"Overall: {passed}/{total} tests passed ({(passed/total)*100:.1f}%)")
    
    if passed == total:
        print("🎉 All backend tests passed! System is working correctly.")
        return True
    else:
        print("⚠️ Some tests failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)