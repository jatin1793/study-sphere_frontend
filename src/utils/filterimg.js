import toast from 'react-hot-toast';

export const filterimg = (e, setprofileimage) => {
    if (e.target.files[0]) {
        if (e.target.files[0].type.startsWith('image/')) {
            setprofileimage(e.target.files[0]);
        } else {
            toast.error('Please select an image.');
            e.target.value = null;
        }
    }
};
