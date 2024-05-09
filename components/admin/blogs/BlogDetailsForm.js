import { useForm } from "react-hook-form";

function BlogDetailsForm({ blog, editState }) {
    const {}=useForm({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            
        }
    })
    return (
        <div>
            Enter
        </div>
    );
}

export default BlogDetailsForm;