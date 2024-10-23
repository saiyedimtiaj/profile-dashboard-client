import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSkillMutation } from "../../redux/api/baseApi";
import { Camera } from "lucide-react";


const CreateSkill = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [createSkill, { isLoading }] = useCreateSkillMutation();
    const nevigate = useNavigate()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first selected file
        if (file) {
            setImage(file); // Set the image file
            setImagePreview(URL.createObjectURL(file)); // Create and set the preview URL
        }
    };

    // Handle image removal
    const handleRemoveImage = () => {
        setImage(null); // Reset the image file
        setImagePreview(null); // Reset the preview
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Create a new FormData object
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("data", JSON.stringify({
            title
        }))


        try {
            const response = await createSkill(formData).unwrap()
            toast.success(response.message)
            nevigate('/skill')
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Add a Skill</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label className="mb-1">Title</Label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <Label className="mb-1">Image</Label>
                    <div className="mt-1">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                        />

                        {/* Image Preview or Upload Button */}
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Blog Thumbnail Preview"
                                    className="w-full h-80 object-cover rounded-lg shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer flex items-center justify-center w-full h-80 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors"
                            >
                                <div className="text-center">
                                    <Camera className="h-10 w-10 mx-auto text-gray-400" />
                                    <p className="text-gray-600 mt-2">Click to upload</p>
                                </div>
                            </label>
                        )}
                    </div>
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default CreateSkill
