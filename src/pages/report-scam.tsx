import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, FileText, Database, Send, Save, MessageCircle, Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FRAUD_TYPES = [
  "Romance Scam",
  "Investment Fraud",
  "Ponzi Scheme",
  "Mining Scam",
  "Exit Scam",
  "Phishing Attack",
  "Rug Pull",
  "Fake Exchange",
  "NFT Scam",
  "DeFi Exploit",
  "Other"
];

const CURRENCIES = ["USD", "EUR", "GBP", "AUD", "CAD", "JPY", "CNY", "BTC", "ETH", "Other"];

const STORAGE_KEY = "fraud_report_draft";

// Generate unique reference ID
const generateReferenceId = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `CR-${year}${month}${day}-${random}`;
};

export default function ReportScamPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [autoSaved, setAutoSaved] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    country: "",
    
    // Step 2: Fraud Details
    fraudType: "",
    amountLost: "",
    currency: "",
    dateOfIncident: "",
    platformName: "",
    platformUrl: "",
    
    // Step 3: Technical Details
    walletAddress: "",
    transactionIds: "",
    scammerContact: "",
    evidenceDescription: "",
    
    // Step 4: Additional Information
    additionalDetails: ""
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || formData);
        setCurrentStep(parsed.currentStep || 1);
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to load saved form data:", err);
    }
  }, []);

  // Auto-save to localStorage whenever formData or currentStep changes
  useEffect(() => {
    if (submitted) return; // Don't save after successful submission
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        formData,
        currentStep,
        savedAt: new Date().toISOString()
      }));
      setAutoSaved(true);
      const timer = setTimeout(() => setAutoSaved(false), 2000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Failed to auto-save form data:", err);
    }
  }, [formData, currentStep, submitted]);

  // Clear saved data
  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        fraudType: "",
        amountLost: "",
        currency: "",
        dateOfIncident: "",
        platformName: "",
        platformUrl: "",
        walletAddress: "",
        transactionIds: "",
        scammerContact: "",
        evidenceDescription: "",
        additionalDetails: ""
      });
      setCurrentStep(1);
      setAutoSaved(false);
    } catch (err) {
      console.error("Failed to clear saved data:", err);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.email && formData.phone && formData.country;
    }
    if (currentStep === 2) {
      return formData.fraudType && formData.amountLost && formData.currency && formData.dateOfIncident && formData.platformName;
    }
    if (currentStep === 3) {
      return formData.evidenceDescription; // Only evidence description is required in step 3
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyReferenceId = () => {
    navigator.clipboard.writeText(referenceId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    // Generate reference ID
    const newReferenceId = generateReferenceId();
    setReferenceId(newReferenceId);

    try {
      const emailContent = `
NEW FRAUD CASE REPORT

REFERENCE ID: ${newReferenceId}

=== PERSONAL INFORMATION ===
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}

=== FRAUD DETAILS ===
Type of Fraud: ${formData.fraudType}
Amount Lost: ${formData.amountLost} ${formData.currency}
Date of Incident: ${formData.dateOfIncident}
Platform Name: ${formData.platformName}
Platform URL: ${formData.platformUrl || "Not provided"}

=== TECHNICAL DETAILS ===
Wallet Address: ${formData.walletAddress || "Not provided"}
Transaction IDs: ${formData.transactionIds || "Not provided"}
Scammer Contact Info: ${formData.scammerContact || "Not provided"}
Evidence Description: ${formData.evidenceDescription}

=== ADDITIONAL INFORMATION ===
${formData.additionalDetails || "None provided"}

---
Submitted: ${new Date().toLocaleString()}
Reference ID: ${newReferenceId}
      `.trim();

      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

      if (!web3formsKey) {
        throw new Error("Email service not configured. Please contact support directly at support@cipherstracer.com");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Fraud Case Report [${newReferenceId}]: ${formData.fraudType} - ${formData.amountLost} ${formData.currency}`,
          from_name: formData.fullName,
          email: formData.email,
          message: emailContent,
          to_email: "support@cipherstracer.com"
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Save to localStorage as backup with reference ID
        const payload = {
          id: crypto.randomUUID(),
          referenceId: newReferenceId,
          ...formData,
          createdAt: new Date().toISOString(),
          source: "fraud_report"
        };

        try {
          const raw = window.localStorage.getItem("site_messages");
          const list = raw ? JSON.parse(raw) : [];
          list.push(payload);
          window.localStorage.setItem("site_messages", JSON.stringify(list));
        } catch (storageError) {
          console.error("LocalStorage save failed:", storageError);
        }

        // Clear the draft from localStorage
        localStorage.removeItem(STORAGE_KEY);

        setSubmitted(true);
        setSubmitting(false);
      } else {
        throw new Error(result.message || "Failed to submit report");
      }
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Failed to submit report. Please try again or email us directly at support@cipherstracer.com");
      console.error("Fraud report error:", err);
    }
  };

  // WhatsApp contact URL
  const whatsappNumber = "19405609662"; // +1 (940) 560-9662 without special characters
  const whatsappMessage = referenceId 
    ? `Hello, I just submitted a fraud case. My reference ID is ${referenceId}.`
    : "Hello, I need help reporting a crypto fraud case.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Contact URLs for different platforms
  const phoneNumber = "+19405609662";
  const displayPhone = "+1 (940) 560-9662";
  const smsUrl = `sms:${phoneNumber}${referenceId ? `&body=${encodeURIComponent(`My reference ID is ${referenceId}`)}` : ''}`;
  const telUrl = `tel:${phoneNumber}`;

  return (
    <>
      <Head>
        <title>Report a Crypto Scam | Cipherstracer Fraud Case Submission</title>
        <meta name="description" content="Report your cryptocurrency fraud case to Cipherstracer. Our blockchain forensics team will investigate and help recover your stolen crypto assets." />
        <meta name="keywords" content="report crypto scam, cryptocurrency fraud report, blockchain forensics case, crypto recovery service, stolen crypto recovery, fraud investigation" />
        <meta property="og:title" content="Report a Crypto Scam | Cipherstracer Fraud Investigation" />
        <meta property="og:description" content="Submit your crypto fraud case securely. Our forensic team provides 24-48 hour response with no upfront fees." />
        <meta property="og:url" content="https://cipherstracer.com/report-scam" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cipherstracer" />
        <link rel="canonical" href="https://cipherstracer.com/report-scam" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <Header />

        <main>
          {/* Auto-save indicator */}
          {autoSaved && !submitted && (
            <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-2">
              <Alert className="border-green-200 bg-green-50 shadow-lg">
                <Save className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-sm">
                  Progress auto-saved
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Hero Section */}
          <section className="relative py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
              <div className="text-center">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  Secure Submission
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Report a Crypto Scam
                </h1>
                <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                  Submit your fraud case details securely. Our blockchain forensics team will review your case and contact you within 24-48 hours.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>100% Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>No Upfront Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Auto-Saved Progress</span>
                  </div>
                </div>

                {/* WhatsApp Contact Button */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 min-w-[200px]">
                    <Link href="#form">Report Fraud Case</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 min-w-[200px]">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-blue-200 mt-4">
                  📱 Contact us: WhatsApp • iMessage • SMS • Call: <strong className="text-white">{displayPhone}</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section id="form" className="py-16 md:py-20">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
              {!submitted ? (
                <Card className="shadow-2xl border-slate-200">
                  <CardHeader className="border-b bg-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-2xl">Fraud Case Report Form</CardTitle>
                      {currentStep < 4 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearSavedData}
                          className="text-slate-600 hover:text-red-600"
                        >
                          Clear Saved Data
                        </Button>
                      )}
                    </div>
                    
                    {/* Progress Stepper */}
                    <div className="flex items-center justify-between">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center flex-1">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold
                            ${currentStep === step ? "bg-blue-600 text-white border-blue-600" : 
                              currentStep > step ? "bg-green-600 text-white border-green-600" : 
                              "bg-white text-slate-400 border-slate-300"}`}>
                            {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
                          </div>
                          {step < 4 && (
                            <div className={`flex-1 h-1 mx-2 ${currentStep > step ? "bg-green-600" : "bg-slate-300"}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm text-slate-600">
                        Step {currentStep} of 4: {
                          currentStep === 1 ? "Personal Information" :
                          currentStep === 2 ? "Fraud Details" :
                          currentStep === 3 ? "Technical Details" :
                          "Review & Submit"
                        }
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              type="text"
                              placeholder="John Doe"
                              value={formData.fullName}
                              onChange={(e) => updateField("fullName", e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john.doe@example.com"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={formData.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country *</Label>
                            <Input
                              id="country"
                              type="text"
                              placeholder="United States"
                              value={formData.country}
                              onChange={(e) => updateField("country", e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>

                        <Alert className="bg-blue-50 border-blue-200">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                          <AlertDescription className="text-blue-800">
                            Your contact information is kept strictly confidential and will only be used to communicate about your case.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {/* Step 2: Fraud Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="fraudType">Type of Fraud *</Label>
                          <Select value={formData.fraudType} onValueChange={(value) => updateField("fraudType", value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select fraud type" />
                            </SelectTrigger>
                            <SelectContent>
                              {FRAUD_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="amountLost">Amount Lost *</Label>
                            <Input
                              id="amountLost"
                              type="text"
                              placeholder="50000"
                              value={formData.amountLost}
                              onChange={(e) => updateField("amountLost", e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="currency">Currency *</Label>
                            <Select value={formData.currency} onValueChange={(value) => updateField("currency", value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {CURRENCIES.map((curr) => (
                                  <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="dateOfIncident">Date of Incident *</Label>
                          <Input
                            id="dateOfIncident"
                            type="date"
                            value={formData.dateOfIncident}
                            onChange={(e) => updateField("dateOfIncident", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="platformName">Platform/Exchange Name *</Label>
                          <Input
                            id="platformName"
                            type="text"
                            placeholder="e.g., FakeCryptoExchange"
                            value={formData.platformName}
                            onChange={(e) => updateField("platformName", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="platformUrl">Platform URL (if available)</Label>
                          <Input
                            id="platformUrl"
                            type="url"
                            placeholder="https://example.com"
                            value={formData.platformUrl}
                            onChange={(e) => updateField("platformUrl", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Technical Details */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="walletAddress">Your Wallet Address (if applicable)</Label>
                          <Input
                            id="walletAddress"
                            type="text"
                            placeholder="0x..."
                            value={formData.walletAddress}
                            onChange={(e) => updateField("walletAddress", e.target.value)}
                            className="mt-1 font-mono text-sm"
                          />
                        </div>

                        <div>
                          <Label htmlFor="transactionIds">Transaction IDs/Hashes (one per line)</Label>
                          <Textarea
                            id="transactionIds"
                            placeholder="0x123abc...&#10;0x456def..."
                            value={formData.transactionIds}
                            onChange={(e) => updateField("transactionIds", e.target.value)}
                            className="mt-1 font-mono text-sm"
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label htmlFor="scammerContact">Scammer Contact Information (email, phone, social media, etc.)</Label>
                          <Textarea
                            id="scammerContact"
                            placeholder="Email: scammer@fake.com&#10;Telegram: @scammer123&#10;Website: https://scam-site.com"
                            value={formData.scammerContact}
                            onChange={(e) => updateField("scammerContact", e.target.value)}
                            className="mt-1"
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label htmlFor="evidenceDescription">Description of Evidence *</Label>
                          <Textarea
                            id="evidenceDescription"
                            placeholder="Describe any evidence you have: screenshots, emails, chat logs, transaction records, etc."
                            value={formData.evidenceDescription}
                            onChange={(e) => updateField("evidenceDescription", e.target.value)}
                            className="mt-1"
                            rows={5}
                            required
                          />
                        </div>

                        <Alert className="bg-amber-50 border-amber-200">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-800">
                            After submitting this form, we will send you instructions on how to securely upload screenshots, documents, and other evidence.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="additionalDetails">Additional Information (Optional)</Label>
                          <Textarea
                            id="additionalDetails"
                            placeholder="Any other details you think we should know..."
                            value={formData.additionalDetails}
                            onChange={(e) => updateField("additionalDetails", e.target.value)}
                            className="mt-1"
                            rows={5}
                          />
                        </div>

                        <Card className="bg-slate-50 border-slate-200">
                          <CardHeader>
                            <CardTitle className="text-lg">Review Your Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4 text-sm">
                            <div>
                              <p className="font-semibold text-slate-700">Personal Information</p>
                              <p className="text-slate-600">{formData.fullName} • {formData.email} • {formData.phone}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-700">Fraud Details</p>
                              <p className="text-slate-600">{formData.fraudType} • {formData.amountLost} {formData.currency} • {formData.platformName}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-700">Date of Incident</p>
                              <p className="text-slate-600">{formData.dateOfIncident}</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            <strong>What happens next:</strong> Our blockchain forensics team will review your case within 24-48 hours and contact you at {formData.email} with next steps. There are no upfront fees.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className="min-w-[120px]"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>

                      {currentStep < 4 ? (
                        <Button
                          onClick={handleNext}
                          disabled={!validateStep()}
                          className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
                        >
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={submitting}
                          className="min-w-[120px] bg-green-600 hover:bg-green-700"
                        >
                          {submitting ? "Submitting..." : "Submit Report"}
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Success Message with Reference ID */
                <Card className="shadow-2xl border-green-200 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-12 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="bg-green-100 p-6 rounded-full">
                        <CheckCircle2 className="h-16 w-16 text-green-600" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Report Submitted Successfully!
                    </h2>
                    
                    {/* Reference ID Display */}
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6 max-w-md mx-auto">
                      <p className="text-sm font-medium text-slate-600 mb-2">Your Case Reference ID</p>
                      <div className="flex items-center justify-center gap-3">
                        <code className="text-2xl font-bold text-blue-600 tracking-wide">
                          {referenceId}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={copyReferenceId}
                          className="hover:bg-blue-100"
                        >
                          {copiedRef ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Copy className="h-5 w-5 text-blue-600" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {copiedRef ? "Copied to clipboard!" : "Click to copy"}
                      </p>
                    </div>

                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                      Thank you for reporting this fraud case. Save your reference ID <strong>{referenceId}</strong> to track your case status.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                      <p className="text-slate-700 mb-2">
                        <strong>What happens next:</strong>
                      </p>
                      <ul className="text-left text-slate-600 space-y-2">
                        <li>✅ You will receive a confirmation email at <strong>{formData.email}</strong></li>
                        <li>✅ Our team will analyze your case and blockchain transactions</li>
                        <li>✅ We will contact you with our findings and recovery options</li>
                        <li>✅ No upfront fees - we only charge if we successfully recover your funds</li>
                        <li>✅ Use reference ID <strong>{referenceId}</strong> in all communications</li>
                      </ul>
                    </div>

                    {/* WhatsApp Contact Section */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                      <p className="text-slate-700 font-semibold mb-3">
                        Need Immediate Assistance?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 flex-1">
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            WhatsApp
                          </a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 flex-1">
                          <a href={smsUrl}>
                            <MessageCircle className="mr-2 h-5 w-5" />
                            iMessage/SMS
                          </a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 flex-1">
                          <a href={telUrl}>
                            📞 Call
                          </a>
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600 text-center">
                        Contact us directly at <strong>+1 (214) 689-9293</strong>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/">Return to Home</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href="/how-we-help-individuals">Learn About Our Process</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Trust Section */}
          <section className="py-12 bg-slate-900 text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">24-48h</div>
                  <div className="text-slate-300">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">100%</div>
                  <div className="text-slate-300">Confidential</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">$0</div>
                  <div className="text-slate-300">Upfront Fees</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">78</div>
                  <div className="text-slate-300">Countries Served</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
