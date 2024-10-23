import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Camera } from "lucide-react"; // Optional: for a camera icon
import { useCreateBlogMutation } from "../../redux/api/baseApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateBlogs = () => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [overview, setOverview] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const nevigate = useNavigate()

    // Handle image change
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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Create a new FormData object
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("data", JSON.stringify({
            title, tag, overview
        }))


        try {
            const response = await createBlog(formData).unwrap()
            toast.success(response.message)
            nevigate('/blogs')
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    // Quill modules for text editor
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link'],
            ['clean'],
        ]
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label className="mb-1">Title</Label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <Label className="mb-1">Tag</Label>
                    <Input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <Label className="mb-1">Blog Thumbnail</Label>
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

                <div className="mt-2">
                    <Label className="mb-1">Project Overview</Label>
                    <ReactQuill
                        className="h-[230px] mb-5 lg:mb-0"
                        placeholder="Write the overview"
                        theme="snow"
                        value={overview}
                        onChange={setOverview}
                        modules={modules}
                    />
                </div>

                <button type="submit" className="mt-14 bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default CreateBlogs;
