import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import des from "../des";

export default function ImageDecEnc() {
    const [img, setImg] = useState("");
    const [ecryptedImg, setEcryptedImg] = useState("");
    const [decryptedImg, setDecryptedImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [base64String, setBase64String] = useState("");

    function uploadImage(e) {
        setEcryptedImg("");
        setDecryptedImg("");
        setImg("");

        const imgFile = e.target.files[0];
        try {
            const url = URL.createObjectURL(imgFile);
            setImg(url);

            var reader = new FileReader();

            reader.onload = function () {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                setBase64String(base64String);
            };
            reader.readAsDataURL(imgFile);
            e.target.value = null;
        } catch (error) {
            console.log(error);
        }
    }

    function encryptImage() {
        setLoading(true);

        console.time("test");
        const encrypted = des.encrypt(base64String);
        console.log("encrypted : " + encrypted);
        console.timeEnd("test");

        setEcryptedImg(encrypted);
        setLoading(false);
    }

    function decryptImage() {
        setLoading(true);
        const src = "data:image/png;base64," + (des.decrypt(ecryptedImg));
        setDecryptedImg(src);
        setLoading(false);
    }

    return (
        <div className="image__decenc__container">

            <div className="image__upload">
                <p>Upload an image to encrypt using DES cipher</p>
                <input type="file" alt="upload" onChange={(e) => uploadImage(e)} />
            </div>

            <div className="images">
                <div className="image__box">
                    <div className="image__container"><img src={img || "/default.jpg"} alt="original" /></div>
                    <button type="button" onClick={encryptImage} disabled={!img || ecryptedImg || loading}>Encrypt</button>
                </div>

                <div>
                    <img className="convert" src="/convert.png" alt="convert" />
                </div>

                <div className="image__box">
                    <div className="image__container">{loading ? <Spinner /> : (ecryptedImg ? <p className="success">encrypted successfuly</p> : <img src={ecryptedImg || "/default.jpg"} alt="cihpered" />)}</div>
                    <button type="button" onClick={decryptImage} disabled={!img || !ecryptedImg || decryptedImg || loading}>Decrypt</button>
                </div>
            </div>

            {decryptedImg ?
                <div className="decrypted__image">
                    <p className="success">decrypted image</p>
                    <hr />
                    <img src={decryptedImg} alt="decrypted" />
                </div> :
                null
            }

        </div>
    );
}