"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    MapPin,
    GraduationCap,
    Github,
    Linkedin,
    Globe,
    Plus,
    X,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

const availableSkills = [
    "React", "Node.js", "Python", "TypeScript", "PostgreSQL",
    "MongoDB", "Firebase", "TensorFlow", "FastAPI", "React Native",
    "Flutter", "AWS", "Docker", "Figma", "UI/UX",
];

const skillLevels = ["Beginner", "Intermediate", "Advanced"] as const;
type SkillLevel = typeof skillLevels[number];

interface SelectedSkill {
    name: string;
    level: SkillLevel;
}

interface InputProps {
    icon: LucideIcon;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

function Input({ icon: Icon, placeholder, value, onChange }: InputProps) {
    return (
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
          w-full h-11 pl-10 pr-4
          border border-gray-300 rounded-xl text-sm
          text-black
          placeholder:text-black placeholder:opacity-60
          focus:outline-none focus:border-black
        "
            />
        </div>
    );
}

export default function CreateProfilePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step1Error, setStep1Error] = useState("");

    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        university: "",
        location: "",
        bio: "",
        availability: "Part-time",
        github: "",
        linkedin: "",
        website: "",
    });

    const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
    const [skillToAdd, setSkillToAdd] = useState("");
    const [levelToAdd, setLevelToAdd] = useState<SkillLevel>("Intermediate");

    useEffect(() => {
        const saved = localStorage.getItem("userProfile");
        if (saved) {
            const data = JSON.parse(saved);
            setProfile(prev => ({ ...prev, ...data }));
            setSelectedSkills(data.skills || []);
        }
    }, []);

    const addSkill = () => {
        if (skillToAdd && !selectedSkills.find(s => s.name === skillToAdd)) {
            setSelectedSkills([...selectedSkills, { name: skillToAdd, level: levelToAdd }]);
            setSkillToAdd("");
        }
    };

    const removeSkill = (name: string) => {
        setSelectedSkills(selectedSkills.filter(s => s.name !== name));
    };

    const updateSkillLevel = (name: string, level: SkillLevel) => {
        setSelectedSkills(
            selectedSkills.map(s => (s.name === name ? { ...s, level } : s))
        );
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        localStorage.setItem(
            "userProfile",
            JSON.stringify({ ...profile, skills: selectedSkills })
        );
        await new Promise(res => setTimeout(res, 500));
        router.push("/dashboard");
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <main className="pt-12 pb-16 px-6">
                <div className="max-w-2xl mx-auto">

                    {/* HEADER */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">
                            Create Your Profile
                        </h1>
                        <p className="text-gray-600">
                            Let&apos;s set up your profile so you can start collaborating
                        </p>
                    </div>

                    {/* STEPPER */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2, 3].map(step => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
                                >
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-16 h-0.5 mx-2 ${currentStep > step ? "bg-black" : "bg-gray-200"}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* FORM BOX */}
                    <div className="border border-black rounded-2xl p-8 bg-white">

                        {/* STEP 1 */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-black">
                                    Basic Information
                                </h2>

                                <div>
                                    <label className="text-sm font-medium text-black">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        icon={User}
                                        placeholder="John Doe"
                                        value={profile.fullName}
                                        onChange={v => setProfile({ ...profile, fullName: v })}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-black">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        icon={Mail}
                                        placeholder="abc@gmail.com"
                                        value={profile.email}
                                        onChange={v => setProfile({ ...profile, email: v })}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-black">
                                        University <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        icon={GraduationCap}
                                        placeholder="Your University"
                                        value={profile.university}
                                        onChange={v => setProfile({ ...profile, university: v })}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-black">
                                        Location
                                    </label>
                                    <Input
                                        icon={MapPin}
                                        placeholder="Your Location"
                                        value={profile.location}
                                        onChange={v => setProfile({ ...profile, location: v })}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-black">
                                        Bio
                                    </label>
                                    <textarea
                                        placeholder="Tell us a little about yourself, your interests, or what you want to build"
                                        value={profile.bio}
                                        onChange={(e) =>
                                            setProfile({ ...profile, bio: e.target.value })
                                        }
                                        rows={4}
                                        className="
                      w-full border border-gray-300 rounded-xl p-3 text-sm
                      text-black
                      placeholder:text-black placeholder:opacity-60
                      focus:outline-none focus:border-black
                    "
                                    />
                                </div>

                                {step1Error && (
                                    <p className="text-sm text-red-500">{step1Error}</p>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => {
                                            if (!profile.fullName || !profile.email || !profile.university) {
                                                setStep1Error("Please fill all required fields.");
                                                return;
                                            }
                                            setStep1Error("");
                                            setCurrentStep(2);
                                        }}
                                        className="bg-black text-white px-6 py-2.5 rounded-xl"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2 */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-black">Your Skills</h2>

                                <div className="flex gap-2">
                                    <select
                                        value={skillToAdd}
                                        onChange={e => setSkillToAdd(e.target.value)}
                                        className="flex-1 h-11 border rounded-xl px-3 text-black"
                                    >
                                        <option value="">Select skill</option>
                                        {availableSkills
                                            .filter(s => !selectedSkills.find(ss => ss.name === s))
                                            .map(skill => (
                                                <option key={skill}>{skill}</option>
                                            ))}
                                    </select>

                                    <select
                                        value={levelToAdd}
                                        onChange={e => setLevelToAdd(e.target.value as SkillLevel)}
                                        className="h-11 border rounded-xl px-3 text-black"
                                    >
                                        {skillLevels.map(l => (
                                            <option key={l}>{l}</option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={addSkill}
                                        className="h-11 px-4 bg-black text-white rounded-xl"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {selectedSkills.map(skill => (
                                    <div
                                        key={skill.name}
                                        className="flex justify-between items-center border rounded-xl p-3"
                                    >
                                        <span>{skill.name}</span>
                                        <div className="flex gap-2 items-center">
                                            <select
                                                value={skill.level}
                                                onChange={e =>
                                                    updateSkillLevel(skill.name, e.target.value as SkillLevel)
                                                }
                                                className="border rounded-full px-3 text-xs text-black"
                                            >
                                                {skillLevels.map(l => (
                                                    <option key={l}>{l}</option>
                                                ))}
                                            </select>
                                            <button onClick={() => removeSkill(skill.name)}>
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-between">
                                    <button onClick={() => setCurrentStep(1)}>Back</button>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        disabled={selectedSkills.length === 0}
                                        className="bg-black text-white px-6 py-2.5 rounded-xl disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3 */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-black">Final Details</h2>

                                <Input
                                    icon={Github}
                                    placeholder="GitHub username"
                                    value={profile.github}
                                    onChange={v => setProfile({ ...profile, github: v })}
                                />

                                <Input
                                    icon={Linkedin}
                                    placeholder="LinkedIn username"
                                    value={profile.linkedin}
                                    onChange={v => setProfile({ ...profile, linkedin: v })}
                                />

                                <Input
                                    icon={Globe}
                                    placeholder="Personal website (optional)"
                                    value={profile.website}
                                    onChange={v => setProfile({ ...profile, website: v })}
                                />

                                <div className="flex justify-between">
                                    <button onClick={() => setCurrentStep(2)}>Back</button>
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-black text-white px-6 py-2.5 rounded-xl"
                                    >
                                        {isSubmitting ? "Creating..." : "Create Profile"}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
