import { Progress, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRef, useState } from 'react';

const ImageInput = ({oldImage, fieldName, setValue}) => {
    const [oldImg, setOldImg] = useState(oldImage);
    const [newImg, setNewImg] = useState();
    const [newImgData, setNewImgData] = useState();
    const [isUploaded, setIsUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [err, setErr] = useState('');
    const fileInputRef = useRef(null);

    const showChangedImg = (e) => {
        const reader = new FileReader();
        setIsUploaded(true);
        reader.onloadend = () => {
            setNewImg(reader.result);
            setNewImgData(e.target.files[0]);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        const myForm = new FormData();
        myForm.append('image', newImgData);

        await axios
            .post(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                myForm,
                {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        setProgress(progress);
                    },
                }
            ).then(({data}) => {
                setValue(fieldName, data.data.url);
                setOldImg(data.data.url);
                setNewImg(null);
                setNewImgData(null);
                setIsUploaded(false);
            })
            .catch((err) => setErr(err.message)).finally(() => {
                setLoading(false);
            })
    }

    return (
        <div>
            <div className="flex md:flex-row flex-col md:w-[50%] w-full gap-5 ">

                <input onChange={showChangedImg} type="file" accept="image/*" ref={fileInputRef}
                    className="file-input flex-grow focus:outline-0 file-input-bordered  rounded-none bg-transparent"/>

                {
                    isUploaded &&
                    <div className='flex gap-x-5'>
                        <button onClick={handleUploadImage} disabled={loading}
                            className='btn text-white btn-success btn-outline rounded-none font-normal'>
                            {loading ? <Spinner color='white'/> : "Upload Image"}
                        </button>
                        {
                            !loading &&
                        <button onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current.value = '';
                            setIsUploaded(false);
                            setNewImg(undefined);
                            setNewImgData(undefined);
                        }} className='btn rounded-none btn-outline btn-error'><i className='bi bi-trash'></i></button>
                        }
                    </div>
                }
            </div>
            {
                err && <span className='text-error my-3'>{err}</span>
            }
            <div className="grid md:grid-cols-2 mt-3 gap-5">
                {
                    oldImg &&
                    <div className='relative'>
                        <p>Current Image</p>
                        <div className="border border-base-300 lg:h-[25rem] h-[20rem] flex justify-center items-center">
                            <img src={oldImg} alt='old image'
                                className=' h-full w-fit object-contain'/>
                        </div>
                    </div>
                }
                {
                    newImg &&
                    <div className='relative'>
                        <p>New Image</p>
                        {
                            loading &&
                            <Progress size='sm' aria-label="Loading..." value={progress} className='my-1' classNames={{
                                track: 'bg-transparent border border-primary',
                            }}/>
                        }
                        <div className="border border-base-300 lg:h-[25rem] h-[20rem] flex justify-center items-center">

                            <img src={newImg} alt='new image'
                                className='h-full w-fit object-contain'/>
                        </div>

                    </div>
                }
            </div>

        </div>
    );
};

export default ImageInput;