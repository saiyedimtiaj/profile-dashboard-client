import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateProjectMutation } from "../../redux/api/baseApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
    const [title, setTitle] = useState('');
    const [technology, setTechnology] = useState('');
    const [description, setDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [overview, setOverview] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [createProject, { isLoading }] = useCreateProjectMutation();
    const nevigate = useNavigate()

    // Custom toolbar configuration for ReactQuill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'code'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link'],
            ['clean'],
        ]
    };

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first selected file
        if (file) {
            setImage(file); // Set the image file
            setImagePreview(URL.createObjectURL(file)); // Create and set the preview URL
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        // Create a FormData object to send data
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            title,
            technology: technology.split(','),
            description,
            githubLink,
            liveLink,
            overview,
        }))

        if (image) {
            formData.append('image', image); // Append the image file if selected
        }

        try {
            const response = await createProject(formData).unwrap()
            toast.success(response.message)
            nevigate('/project')
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Create Project</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label className="mb-1">Title</Label>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mt-2">
                    <Label className="mb-1">Technology (comma separated)</Label>
                    <Input type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} />
                </div>
                <div className="mt-2">
                    <Label className="mb-1">Description</Label>
                    <Textarea className="w-full" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mt-2">
                    <Label className="mb-1">Github Link</Label>
                    <Input type="text" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
                </div>
                <div className="mt-2">
                    <Label className="mb-1">Live Link</Label>
                    <Input type="text" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
                </div>
                <div className="mt-4">
                    <Label className="mb-1">Project Thumbnail</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input mt-1"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <Label>Image Preview:</Label>
                            <img
                                src={imagePreview}
                                alt="Project Thumbnail Preview"
                                className="w-64 h-40 object-cover mt-2"
                            />
                        </div>
                    )}
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

export default CreateProject;
