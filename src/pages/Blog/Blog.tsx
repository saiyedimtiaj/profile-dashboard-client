import { useState } from "react";
import { useDeleteBlogMutation, useGetBlogsQuery } from "../../redux/api/baseApi"; // Import your delete mutation
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { toast } from "sonner";

const Blog = () => {
    const { data, isLoading } = useGetBlogsQuery(undefined);
    const [deleteProject] = useDeleteBlogMutation(); // Mutation for deleting a project
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleDelete = async () => {
        if (selectedProjectId) {
            const data = await deleteProject(selectedProjectId).unwrap();
            toast.success(data?.message)
            setModalOpen(false);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-semibold mt-2 mb-4">Project</h1>
            <Table>
                <TableCaption>A list of my Blogs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead >Name</TableHead>
                        <TableHead >Created At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.data?.map((project: { _id: string; title: string; image: string, createdAt: string }) => (
                            <TableRow key={project._id}>
                                <TableCell>
                                    <img src={project?.image} className="w-10 h-10 object-cover" alt={project?.title} />
                                </TableCell>
                                <TableCell className="font-medium">{project?.title}</TableCell>
                                <TableCell className="font-medium">{project?.createdAt}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => {
                                        setSelectedProjectId(project?._id);
                                        setModalOpen(true);
                                    }}>
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Blog;
