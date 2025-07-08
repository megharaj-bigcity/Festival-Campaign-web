import React, { useState } from 'react';
import { Send, Building2, Mail, Phone, Users, Target, Briefcase } from 'lucide-react';

const RewardStrategyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    companyBrand: '',
    industry: '',
    campaignObjective: '',
    targetAudience: '',
    age: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  const industries = [
    'FMCG Home Care',
    'FMCG Food',
    'FMCG Personal Care',
    'FMCG Non-Alcoholic Beverages',
    'Retail Fashion and Accessories',
    'Retail Electronics',
    'Consumer Durable Goods',
    'Alcohol Beverages',
    'Banking and Financial Industries',
    'Automotive'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorDetails('');

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'mobile', 'companyBrand', 'industry', 'campaignObjective', 'targetAudience', 'age'];
      const missingFields = requiredFields.filter(field => !formData[field].trim());
      
      if (missingFields.length > 0) {
        setSubmitStatus('error');
        setErrorDetails(`Missing required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      console.log('Submitting form data:', formData);

      const n8nWebhookUrl = 'https://n8n.srv888880.hstgr.cloud/webhook/54d0558c-8b37-4927-873c-9df1f7b535c0';
      
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'react_form'
      };

      console.log('Payload being sent:', payload);

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'cors', // Explicitly set CORS mode
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.text();
        console.log('Response data:', responseData);
        
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          companyBrand: '',
          industry: '',
          campaignObjective: '',
          targetAudience: '',
          age: ''
        });
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        setSubmitStatus('error');
        setErrorDetails(`Server error (${response.status}): ${errorText || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // More specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrorDetails('Network error: Unable to connect to server. Please check your internet connection.');
      } else if (error.name === 'TypeError' && error.message.includes('CORS')) {
        setErrorDetails('CORS error: The server needs to allow cross-origin requests.');
      } else {
        setErrorDetails(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Test webhook connectivity
  const testWebhook = async () => {
    try {
      const response = await fetch('https://n8n.srv888880.hstgr.cloud/webhook/54d0558c-8b37-4927-873c-9df1f7b535c0', {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });
      console.log('OPTIONS response:', response.status);
    } catch (error) {
      console.error('OPTIONS test failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <div className="text-right">
              <h3 className="text-lg font-bold text-gray-800">BigCity Promotions</h3>
              <p className="text-sm text-gray-600">Reward Strategy Experts</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Festive Reward Strategy Request
          </h1>
          <p className="text-gray-600">
            Get customized reward program recommendations for your brand
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Work Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your.email@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Mobile *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="9535276700"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 mr-2" />
                Company/Brand Name *
              </label>
              <input
                type="text"
                name="companyBrand"
                value={formData.companyBrand}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Lizol Floor Cleaner"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 mr-2" />
              Industry *
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select your industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-2" />
              Campaign Objective *
            </label>
            <select
              name="campaignObjective"
              value={formData.campaignObjective}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select your campaign objective</option>
              <option value="Drive sales/conversions">Drive sales/conversions</option>
              <option value="Acquire new customers">Acquire new customers</option>
              <option value="Increase repeat purchases">Increase repeat purchases</option>
              <option value="Boost product trials/sampling">Boost product trials/sampling</option>
              <option value="Engage trade/channel partners">Engage trade/channel partners</option>
              <option value="Drive store/online footfalls">Drive store/online footfalls</option>
              <option value="Engage customers through gamified experiences">Engage customers through gamified experiences</option>
              <option value="New product launch">New product launch</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Target Audience *
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., women, working professionals"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Age Range *
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 25-60"
              />
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Request submitted successfully! You'll receive your custom reward strategy report shortly.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">
                ❌ There was an error submitting your request.
              </p>
              {errorDetails && (
                <p className="text-red-600 text-sm mt-2">
                  Details: {errorDetails}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Request...
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Get My Reward Strategy Report
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={testWebhook}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Test Connection
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Our AI-powered system will analyze your requirements and generate a comprehensive reward strategy report within minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardStrategyForm;
