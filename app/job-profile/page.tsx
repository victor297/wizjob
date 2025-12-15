"use client";

import {
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  FileText,
  Briefcase,
  DollarSign,
  Globe,
  CheckCircle,
  Info,
  ArrowRight,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";
import { FiEdit } from "react-icons/fi";

const formSchema = z.object({
  resumeUrl: z.string().optional(),
  noResume: z.boolean().optional(),
  phone: z.string().optional(),

  location: z.string().min(1, "Location is required"),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  summary: z.string().optional(),
  currentRole: z.string().optional(),
  yearsExperience: z.string().optional(),

  targetJob: z.string().min(1, "Target job is required"),
  additionalRoles: z.array(z.string()),
  jobType: z.array(z.string()),
  workLocation: z.array(z.string()),
  experienceLevel: z.string(),

  industries: z.array(z.string()),
  skills: z.array(z.string()),

  currency: z.string(),
  minSalary: z.string(),
  maxSalary: z.string(),
  availability: z.string(),
  willingToRelocate: z.boolean(),

  allCorrect: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function App() {
  const [step, setStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const totalSteps = 6;

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "San Francisco, CA",
      currentRole: "Senior software engineer",
      yearsExperience: "5",
      targetJob: "Teacher",
      additionalRoles: ["Public Speaker", "Facilitator"],
      jobType: ["Part-time"],
      workLocation: ["Hybrid"],
      experienceLevel: "Expert",
      industries: ["Education", "Information Tech"],
      skills: ["TypeScript", "Python", "Node.js"],
      currency: "USD ($)",
      minSalary: "8000",
      maxSalary: "12000",
      availability: "Immediately",
      willingToRelocate: false,
      allCorrect: false,
    },
  });

  const formWatch = watch();

  const onSubmit = (data: FormData) => {
    console.log("Setup complete!", data);
    // Show success modal
    setShowSuccessModal(true);
  };

  const progress = (step / totalSteps) * 100;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Add this function to handle moving to review step
  const handleStepCompletion = () => {
    if (step === totalSteps) {
      // If we're on the last form step (step 6), go to review
      setStep(totalSteps + 1);
    } else {
      next();
    }
  };

  const renderStep = () => {
    if (step === 0) {
      return <WelcomeStep onLetsGo={() => setStep(1)} />;
    }
    if (step === totalSteps + 1) {
      return (
        <ReviewStep
          data={formWatch}
          register={register}
          onComplete={handleSubmit(onSubmit)}
          setStep={setStep}
          totalSteps={totalSteps}
        />
      );
    }
    return (
      <StepWrapper
        step={step}
        title={getStepTitle(step)}
        subtitle={getStepSubtitle(step)}
      >
        {step === 1 && (
          <ResumeStep
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        )}
        {step === 2 && (
          <ContactStep
            setValue={setValue}
            errors={errors}
            register={register}
            watch={watch}
          />
        )}
        {step === 3 && (
          <SummaryStep
            setValue={setValue}
            errors={errors}
            register={register}
            watch={watch}
          />
        )}
        {step === 4 && (
          <PreferencesStep
            watch={watch}
            setValue={setValue}
            errors={errors}
            register={register}
          />
        )}
        {step === 5 && (
          <IndustrySkillsStep
            watch={watch}
            setValue={setValue}
            errors={errors}
            register={register}
          />
        )}
        {step === 6 && (
          <SalaryStep
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        )}
      </StepWrapper>
    );
  };

  const getStepTitle = (step: number) => {
    const titles = [
      "",
      "Upload your resume",
      "Contact Information",
      "Professional Summary",
      "Job Preferences",
      "Industry & Skills",
      "Salary & Availability",
    ];
    return titles[step] || "";
  };

  const getStepSubtitle = (step: number) => {
    const subtitles = [
      "",
      "This helps us auto-fill your applications and find better matches",
      "Tell us about your professional background",
      "Tell us about your professional background",
      "What type of roles are you looking for?",
      "Help us match you with the right opportunities",
      "Set your expectations for compensation",
    ];
    return subtitles[step] || "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-6 py-8">
        {step >= 1 && step <= totalSteps && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{progress.toFixed(0)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  step >= 4
                    ? "bg-yellow-500"
                    : step >= 1
                    ? "bg-red-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}

          {step >= 1 && step <= totalSteps && (
            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={back}
                className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 flex items-center gap-2 hover:bg-gray-50"
              >
                <ChevronLeft size={20} /> Back
              </button>
              <div className="flex gap-3">
                {step < totalSteps && (
                  <button
                    type="button"
                    onClick={next}
                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Skip
                  </button>
                )}
                <button
                  type={step === totalSteps ? "button" : "button"} // Always button since we're handling navigation manually
                  onClick={handleStepCompletion} // Use the new handler
                  className="px-8 py-3 rounded-full bg-[#0EA5E9] text-white flex items-center gap-2 hover:bg-[#0EA5E9]"
                >
                  {step === totalSteps ? "Complete Setup" : "Continue"}
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </form>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-400/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full mx-auto overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 pb-0">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">
                  You&apos;re ready to go
                </h2>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Your profile is all set up and you&apos;re ready to go!
                Let&apos;s start automating your job applications and landing
                your dream role.
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* WizBot Auto-Apply */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    WizBot Auto-Apply
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Create AI agents to automatically apply to jobs
                  </p>
                </div>
              </div>

              {/* Smart Job Discovery */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Smart Job Discovery
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Find opportunities tailored to your profile
                  </p>
                </div>
              </div>

              {/* Application Tracking */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Application Tracking
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor all your applications in one place
                  </p>
                </div>
              </div>

              {/* Interactive Guide Note */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-[#0EA5E9]">
                  You can explore the platform with our interactive guide
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  // You might want to redirect to dashboard or home here
                  // router.push('/dashboard');
                }}
                className="w-full py-3 bg-[#0EA5E9] text-white font-medium rounded-lg hover:bg-[#0EA5E9] transition-colors flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
interface StepWrapperProps {
  step: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function StepWrapper({ title, subtitle, children }: StepWrapperProps) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 mb-8">{subtitle}</p>}
      {children}
    </>
  );
}

interface WelcomeStepProps {
  onLetsGo: () => void;
}

function WelcomeStep({ onLetsGo }: WelcomeStepProps) {
  return (
    <div className="text-center py-20">
      <div className="mx-auto mb-8 w-32 h-32  rounded-full flex items-center justify-center">
        <Image
          src="/hand.svg"
          alt="WizJobAI"
          className="h-32 w-auto"
          width={10}
          height={5}
        />
      </div>
      <h1 className="text-3xl font-bold mb-3">Welcome to WizJobAI, Kent</h1>
      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Your Job Automation Assistant! Kindly take a brief moment to provide us
        with your information to enable us to give you a personalized experience
      </p>
      <button
        onClick={onLetsGo}
        className="mt-10 px-10 cursor-pointer py-2 w-full max-w-xs rounded-full bg-[#0EA5E9] text-white text-lg font-medium hover:bg-[#0EA5E9] transition"
      >
        Let&apos;s Go
      </button>
    </div>
  );
}

interface StepComponentProps {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: any;
}

function ResumeStep({ register, watch, setValue, errors }: StepComponentProps) {
  const noResume = watch("noResume");

  return (
    <div className="space-y-8">
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-[#0EA5E9] font-medium">Click to upload resume</p>
        <p className="text-sm text-gray-500">
          or drag and Drop here or click to browse
        </p>
        <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
      </div>

      <div className="text-center">
        <p className="text-gray-600">Or provide a URL</p>
        <div className="mt-3 w-full  mx-auto">
          <Input
            labelPosition="border"
            placeholder="https://drive.google.com/your-resume"
            register={register("resumeUrl")}
            id="resumeUrl"
            error={errors.resumeUrl}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Link to your resume on Google Drive, Dropbox, or personal website
        </p>
        <label className="flex items-center justify-center mt-6 gap-2">
          <input
            type="checkbox"
            checked={noResume || false}
            onChange={(e) => setValue("noResume", e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-gray-600">
            I don&apos;t have a resume.
          </span>
        </label>
      </div>
    </div>
  );
}

function ContactStep({ register, errors }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <Input
        label="Phone Number (Optional)"
        type="tel"
        placeholder="+1 (555) 123-4567"
        register={register("phone")}
        id="phone"
        labelPosition="top"
      />

      <Input
        label="Current Location"
        placeholder="San Francisco, CA"
        register={register("location")}
        id="location"
        labelPosition="top"
        error={errors.location}
      />

      <Input
        label="LinkedIn Profile (Optional)"
        placeholder="https://linkedin.com/in/yourprofile"
        register={register("linkedin")}
        id="linkedin"
        labelPosition="top"
      />

      <Input
        label="Portfolio/Website (Optional)"
        placeholder="https://yourportfolio.com"
        register={register("portfolio")}
        id="portfolio"
        labelPosition="top"
      />
    </div>
  );
}

function SummaryStep({ register }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-600 mb-2">
          Professional Summary
        </label>
        <textarea
          {...register("summary")}
          placeholder="Write a brief summary about yourself, your experience and your career goals"
          rows={5}
          className="w-full border rounded-2xl px-4 py-3 resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          0/500 characters (aim for 150-300)
        </p>
      </div>

      <Input
        label="Current/Recent Role (Optional)"
        placeholder="Senior Software Engineer"
        register={register("currentRole")}
        id="currentRole"
        labelPosition="top"
      />

      <Input
        label="Years of Experience (Optional)"
        type="number"
        placeholder="5"
        register={register("yearsExperience")}
        id="yearsExperience"
        labelPosition="top"
      />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="font-medium text-[#0EA5E9] mb-2">
          💡 Tips for a great summary:
        </p>
        <ul className="list-disc list-inside text-sm text-[#0EA5E9] space-y-1">
          <li>Highlight your key skills and expertise</li>
          <li>Mention your years of experience</li>
          <li>Include your career goals or interests</li>
          <li>Keep it concise and impactful (2-3 sentences)</li>
        </ul>
      </div>
    </div>
  );
}

function PreferencesStep({
  watch,
  setValue,
  register,
  errors,
}: StepComponentProps) {
  const jobType = watch("jobType") || [];
  const workLocation = watch("workLocation") || [];
  const additionalRoles = watch("additionalRoles") || [];

  return (
    <div className="space-y-6">
      <div>
        <Input
          label="Target job title"
          placeholder="Teacher"
          register={register("targetJob")}
          id="targetJob"
          labelPosition="top"
        />
        <div className="flex flex-wrap gap-2">
          {additionalRoles.map((role: string, i: number) => (
            <span
              key={i}
              className="bg-blue-100 text-[#0EA5E9] px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {role}
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "additionalRoles",
                    additionalRoles.filter((_, idx: number) => idx !== i)
                  )
                }
                className="text-[#0EA5E9] hover:text-[#0EA5E9]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Job Type</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            "Full-time",
            "Part-time",
            "Contract",
            "Internship",
            "Freelance",
          ].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={jobType.includes(type)}
                onChange={(e) => {
                  setValue(
                    "jobType",
                    e.target.checked
                      ? [...jobType, type]
                      : jobType.filter((t: string) => t !== type)
                  );
                }}
                className="rounded"
              />
              <span
                className={
                  jobType.includes(type)
                    ? "text-[#0EA5E9] font-medium"
                    : "text-gray-700"
                }
              >
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">
          Work Location Preference (Multiple selection)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Remote", "Hybrid", "Onsite", "Any"].map((loc) => (
            <label
              key={loc}
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={workLocation.includes(loc)}
                onChange={(e) => {
                  setValue(
                    "workLocation",
                    e.target.checked
                      ? [...workLocation, loc]
                      : workLocation.filter((t: string) => t !== loc)
                  );
                }}
                className="rounded"
              />
              <span
                className={
                  workLocation.includes(loc)
                    ? "text-[#0EA5E9] font-medium"
                    : "text-gray-700"
                }
              >
                {loc}
              </span>
            </label>
          ))}
        </div>
      </div>
      <SelectInput
        id="experienceLevel"
        label="Experience Level"
        register={register("experienceLevel")}
        error={errors.experienceLevel}
        options={[
          { value: "Entry Level", label: "Entry Level" },
          { value: "Mid-level", label: "Mid-level" },
          { value: "Senior", label: "Senior" },
          { value: "Expert", label: "Expert" },
        ]}
      />
    </div>
  );
}

function IndustrySkillsStep({ watch, setValue, register }: StepComponentProps) {
  const industries = watch("industries") || [];
  const skills = watch("skills") || [];

  return (
    <div className="space-y-6">
      <div>
        <Input
          label="Target Industries *"
          placeholder="Education"
          register={register("industries.0")}
          id="industries"
          labelPosition="top"
        />
        <div className="flex flex-wrap gap-2">
          {industries.filter(Boolean).map((ind: string, i: number) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {ind}
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "industries",
                    industries.filter((_, idx: number) => idx !== i)
                  )
                }
                className="text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <Input
          label="Top Skills *"
          placeholder="Type to add skills"
          register={register("skills.0")}
          id="skills"
          labelPosition="top"
        />
        <div className="flex flex-wrap gap-2">
          {skills.filter(Boolean).map((skill: string, i: number) => (
            <span
              key={i}
              className="bg-blue-100 text-[#0EA5E9] px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {skill}
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "skills",
                    skills.filter((_, idx: number) => idx !== i)
                  )
                }
                className="text-[#0EA5E9] hover:text-[#0EA5E9]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalaryStep({ register, watch, setValue, errors }: StepComponentProps) {
  const willingToRelocate = watch("willingToRelocate");

  return (
    <div className="space-y-6">
      <SelectInput
        id="currency"
        label="Currency"
        register={register("currency")}
        options={[
          { value: "USD ($)", label: "USD ($)" },
          { value: "EUR (€)", label: "EUR (€)" },
          { value: "GBP (£)", label: "GBP (£)" },
        ]}
        // Optional props:
        // theme="dark" // default is "dark"
        // labelPosition="top" // default is "top"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Minimum Salary"
          type="number"
          placeholder="8000"
          register={register("minSalary")}
          id="minSalary"
          labelPosition="top"
        />

        <Input
          label="Maximum Salary"
          type="number"
          placeholder="12000"
          register={register("maxSalary")}
          id="maxSalary"
          labelPosition="top"
        />
      </div>

      <SelectInput
        id="availability"
        label="When can you start?"
        register={register("availability")}
        error={errors.availability}
        options={[
          { value: "Immediately", label: "Immediately" },
          { value: "1-2 weeks", label: "1-2 weeks" },
          { value: "1 month", label: "1 month" },
          { value: "2+ months", label: "2+ months" },
        ]}
        labelPosition="top" // Your original has label on top
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={willingToRelocate}
          onChange={(e) => setValue("willingToRelocate", e.target.checked)}
          className="rounded"
        />
        <span className="text-sm text-gray-600">
          I&apos;m willing to relocate for the right opportunity
        </span>
      </label>
    </div>
  );
}

interface ReviewStepProps {
  data: FormData;
  register: UseFormRegister<FormData>;
  onComplete: (e?: React.BaseSyntheticEvent) => Promise<void>;
  setStep: (step: number) => void;
  totalSteps: number;
}

function ReviewStep({
  register,
  data,
  onComplete,
  setStep,
  totalSteps,
}: ReviewStepProps) {
  return (
    <div className="py-10">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <Image
            src="/check.svg"
            alt="WizJobAI"
            className="h-20 w-auto"
            width={10}
            height={5}
          />{" "}
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          You&apos;re All Set!
        </h2>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Take a few seconds to review your information before we complete this
          process
        </p>
      </div>

      {/* Review Sections */}
      <div className="space-y-6 mb-8">
        {/* Contact Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#0EA5E9]" />
              Contact Information
            </h3>
            <FiEdit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{data.phone || "+1 234 56789"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{data.location}</span>
            </div>
            {data.linkedin && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>{data.linkedin}</span>
              </div>
            )}
            {data.portfolio && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>{data.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0EA5E9]" />
              Professional Summary
            </h3>
            <FiEdit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="text-sm text-gray-600 leading-relaxed">
            {data.summary ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Current role: {data.currentRole || "Senior software engineer"} •{" "}
            {data.yearsExperience || "5"} years experience
          </div>
        </div>

        {/* Job Preferences */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#0EA5E9]" />
              Job Preferences
            </h3>
            <FiEdit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="font-medium">{data.targetJob || "Teacher"}</span>
              {data.additionalRoles?.map((role: string) => (
                <span
                  key={role}
                  className="bg-gray-100 px-2 py-1 rounded text-xs"
                >
                  + {role}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              {data.jobType?.map((type: string) => (
                <span
                  key={type}
                  className="bg-blue-100 text-[#0EA5E9] px-2 py-1 rounded text-xs"
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="font-medium">
                {data.workLocation?.join(", ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{data.experienceLevel} level</span>
            </div>
          </div>
        </div>

        {/* Industry & Skills */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#0EA5E9]" />
              Industry & Skills
            </h3>
            <FiEdit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              {data.industries?.filter(Boolean).map((ind: string) => (
                <span
                  key={ind}
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                >
                  {ind}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              {data.skills?.filter(Boolean).map((skill: string) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-[#0EA5E9] px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Salary & Availability */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#0EA5E9]" />
              Salary & Availability
            </h3>
            <FiEdit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="font-medium">
                ${data.minSalary || "8000"}-${data.maxSalary || "12000"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{data.availability || "Immediately"}</span>
            </div>
            {data.willingToRelocate && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-green-600">✅ Willing to relocate</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("allCorrect")}
            className="h-5 w-5 text-[#0EA5E9] rounded"
          />
          <span className="text-sm text-gray-700">
            All the information are correct
          </span>
        </label>
      </div>

      {/* Next Steps Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3 mb-3">
          <Info className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium text-[#0EA5E9]">
            Here&apos;s what happens next:
          </p>
        </div>
        <ul className="space-y-2 text-sm text-[#0EA5E9]">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>We&apos;ll use this info to find the best job matches</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>You can create AI agents to auto-apply to jobs</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>Track all your applications in one place</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>Get insights and analytics on your job search</span>
          </li>
        </ul>
      </div>

      {/* Final Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(totalSteps)}
          className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 flex items-center gap-2 hover:bg-gray-50"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <button
          type="submit"
          onClick={onComplete}
          className="px-8 py-3 rounded-full bg-[#0EA5E9] text-white flex items-center gap-2 hover:bg-[#0EA5E9]"
        >
          Complete Setup <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
