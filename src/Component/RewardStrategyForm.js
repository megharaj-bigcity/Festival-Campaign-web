import React, { useState } from 'react';
import { Send, Building2, Mail, Phone, Users, Target, Briefcase } from 'lucide-react';

const RewardStrategyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    companyName: '',
    brandName: '',
    industry: '',
    campaignObjective: [],
    targetAudience: [],
    age: []
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
    'Automotive',
    'Stationery',
    'Kitchenware and homeware',
    'Toys',
    'Telecom',
    'Pet care and food'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorDetails('');

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'mobile', 'companyName', 'brandName', 'industry'];
      const missingFields = requiredFields.filter(field => !formData[field].trim());
      
      // Check if arrays have selections
      if (formData.campaignObjective.length === 0) missingFields.push('campaignObjective');
      if (formData.targetAudience.length === 0) missingFields.push('targetAudience'); 
      if (formData.age.length === 0) missingFields.push('age');
      
      if (missingFields.length > 0) {
        setSubmitStatus('error');
        setErrorDetails(`Missing required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      console.log('Submitting form data:', formData);

      // Replace with your actual n8n webhook URL
      const n8nWebhookUrl = 'https://n8n.srv888880.hstgr.cloud/webhook/ef140662-d5bb-4ad4-93d3-54268b6019be';
      
      const payload = {
        ...formData,
        // Convert arrays to comma-separated strings
        campaignObjective: formData.campaignObjective.join(', '),
        targetAudience: formData.targetAudience.join(', '),
        age: formData.age.join(', '),
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
        mode: 'cors',
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const responseData = await response.text();
        console.log('Response data:', responseData);
        
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          companyName: '',
          brandName: '',
          industry: '',
          campaignObjective: [],
          targetAudience: [],
          age: []
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Unilever, P&G, Nestle"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4 mr-2" />
              Brand Name *
            </label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Lizol, Maggi, Dove"
            />
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
              Campaign Objective * (Select multiple options)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Drive sales/conversions',
                'Acquire new customers',
                'Increase repeat purchases',
                'Boost product trials/sampling',
                'Engage trade/channel partners',
                'Drive store/online footfalls',
                'Drive engagement',
                'New product launch'
              ].map((objective) => (
                <label key={objective} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="campaignObjective"
                    value={objective}
                    checked={formData.campaignObjective.includes(objective)}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{objective}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Target Audience * (Select multiple options)
              </label>
              <div className="space-y-2">
                {['Men', 'Women', 'Kids', 'Young Adults'].map((audience) => (
                  <label key={audience} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="targetAudience"
                      value={audience}
                      checked={formData.targetAudience.includes(audience)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{audience}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Age Group * (Select multiple options)
              </label>
              <div className="space-y-2">
                {['Below 18', '18 to 25', '25 - 40', 'Above 40'].map((ageGroup) => (
                  <label key={ageGroup} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="age"
                      value={ageGroup}
                      checked={formData.age.includes(ageGroup)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{ageGroup}</span>
                  </label>
                ))}
              </div>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
        </form>

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
