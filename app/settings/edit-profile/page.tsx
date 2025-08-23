'use client';
import { useEffect, useState } from "react";
import SaveChange from "@/components/saveChange";

export default function EditProfilePage() {
    // Form states (empty means unchanged; placeholders show existing values)
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [telegram, setTelegram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [saving, setSaving] = useState(false);

    // Existing data for placeholders and current photo
    const [existing, setExisting] = useState<{
        username?: string;
        bio?: string;
        phone?: string;
        telegram?: string;
        facebook?: string;
        profilePhoto?: string;
    }>({});

    // Image preview + file
    const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/settings/me');
                if (!res.ok) return;
                const data = await res.json();
                const user = data?.user || {};
                setExisting({
                    username: user.username,
                    bio: user.bio,
                    phone: user.phone,
                    telegram: user.telegram,
                    facebook: user.facebook,
                    profilePhoto: user.profilePhoto,
                });
                if (user.profilePhoto) setProfilePhotoPreview(user.profilePhoto);
            } catch (e) {
                console.error('Failed to load profile', e);
            }
        };
        load();
    }, []);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const photoURL = URL.createObjectURL(file);
            setProfilePhotoPreview(photoURL);
            setProfilePhotoFile(file);
        }
    };

    const fileToDataUrl = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSaving(true);
        // Declare controller/timeout in outer scope so we can clear in finally
        let controller: AbortController | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        try {
            let profilePhotoDataUrl: string | undefined = undefined;
            if (profilePhotoFile) {
                profilePhotoDataUrl = await fileToDataUrl(profilePhotoFile);
            }

            // Add a 20s timeout to avoid hanging indefinitely
            controller = new AbortController();
            timeoutId = setTimeout(() => controller?.abort(), 20000);

            const resp = await fetch('/api/settings/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    username: username || undefined,
                    bio: bio || undefined,
                    phone: phone || undefined,
                    telegram: telegram || undefined,
                    facebook: facebook || undefined,
                    profilePhotoDataUrl,
                }),
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to update profile');
            }

            // Optionally refresh existing values
            const { profilePhotoUrl } = await resp.json();
            setExisting((prev) => ({
                ...prev,
                username: username || prev.username,
                bio: bio || prev.bio,
                phone: phone || prev.phone,
                telegram: telegram || prev.telegram,
                facebook: facebook || prev.facebook,
                profilePhoto: profilePhotoUrl || prev.profilePhoto,
            }));

        } catch (e) {
            if ((e as any)?.name === 'AbortError') {
                alert('Request timed out. Please try again.');
            } else {
                console.error(e);
                alert(e instanceof Error ? e.message : 'Update failed');
            }
        } finally {
            // Always clear timeout and reset saving state
            try { if (timeoutId) clearTimeout(timeoutId); } catch {}
            setSaving(false);
        }
    };

    // No dropdown options needed after removing Major/Year/Role

    return (
        <div className="w-full bg-gray-100 grid grid-cols-12 bg-white">
            <div className="bg-white text-gray-700 col-span-9 col-start-4 px-0 py-4 sm:py-6 md:py-8 xl:py-10 2xl:py-12 overflow-x-hidden">
                <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800">Profile</h2>
                    <button className="text-[#1E3A8A] flex items-center gap-2 hover:underline">
                        <span aria-hidden>←</span>
                        <span className="text-base sm:text-lg">Back</span>
                    </button>                
                </div>

                <form onSubmit={handleSubmit} className="ml-0 text-left">
                    {/* Profile Photo */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">

                            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full bg-gray-200 overflow-hidden">
                                {profilePhotoPreview ? (
                                    <img
                                        src={profilePhotoPreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    No Photo
                                </div>
                                )}
                            </div>

                            <label className="ml-0 sm:ml-6 text-black cursor-pointer">
                                <div className="border-1 px-3 py-3 rounded-[10px] border-gray-400 hover:bg-gray-200 hover:cursor-pointer">
                                    <span>Change Photo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Username only */}
                    <div className="mb-10">
                        <label className="block text-gray-700 mb-2">User Name</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={existing.username || "Enter your nickname"}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-10">
                        <label className="block text-gray-700 mb-2">Bio</label>
                        <textarea
                            value={bio}
                            placeholder={existing.bio || "Tell us about yourself"}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-3 border-gray-500 border-1 h-[150px] rounded-[10px] 
                                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                      resize-none text-gray-900 placeholder-gray-400"
                            rows={3}
                        />
                    </div>

                    {/* Removed: Major, Academic Year, Role */}
                    
                    {/* Email Address, Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 2xl:gap-8 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder={existing.phone || "+1 (555) 123-4567"}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                            text-gray-900 placeholder-gray-400"
                                />
                        </div>
                    </div>

                    {/* Telegram, Facebook */}
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 2xl:gap-8 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Telegram <span className="text-slate-600">(optional)</span></label>
                            <input
                                type="text"
                                value={telegram}
                                onChange={(e) => setTelegram(e.target.value)}
                                placeholder={existing.telegram || "@yourusername"}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                            text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Facebook <span className="text-slate-600">(optional)</span></label>
                            <input
                                type="url"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                placeholder={existing.facebook || "https://facebook.com/yourprofile"}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                            text-gray-900 placeholder-gray-400"
                                />
                        </div>
                    </div>

                    {/* Save Changes Button */}
                    <SaveChange loading={saving} disabled={saving} />

                </form>
                </div>
            </div>
        </div>
    );
}

