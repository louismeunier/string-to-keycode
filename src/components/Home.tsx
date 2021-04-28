import { useState } from "react";
import convertString from "../logic/stringToKeycode";

export default function Home() {
    const [macro, setMacro] = useState("");

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const converted = convertString(e.target.value).join("");
        setMacro(converted);
    }

    const handleClick = () => {
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(macro).then(function() {
                    /* clipboard successfully set */
                  }, function() {
                    /* clipboard write failed */
                  });
            }
        });
    }

    return (
        <div className="w-2/3 h-2/3 bg-red-300 rounded-lg grid grid-rows-2">
            <div className="grid place-items-center border-b-4 border-dashed">
                <textarea 
                    onChange={handleChange}
                    className="shadow-lg rounded-lg p-2 w-1/2 h-1/2 text-center overflow-auto resize-none" 
                    placeholder="Example"
                />
            </div>
            <div className="grid place-items-center">
                <div className="w-1/2 h-1/2 grid grid-cols-5 gap-4">
                    <div className="shadow-lg bg-white rounded-lg text-center col-span-4">
                        <textarea
                            className="resize-none h-full w-full rounded-lg"
                            value={macro}
                        >
                        </textarea>
                    </div>
                    <div className="grid place-items-center">
                        <button
                            onClick={handleClick}
                            className="bg-red-100 shadow-lg rounded-lg w-full h-1/2"
                        >
                            COPY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}