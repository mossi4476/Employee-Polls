import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {handleAddQuestion} from "../../service/actions/questions";

const NewPoll = ({dispatch}) => {
    const navigate = useNavigate();
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const inputOption = (e, option) => {
        const value = e ? e.target.value : "";
        option === "1" ?  setFirstOption(value) : setSecondOption(value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!firstOption || !secondOption) {
            alert("Please input First Option & Second Option!")
            return;
        }
        dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/", { replace: true });
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Would You Rather</h1>
            <h3 className="text-xl text-gray-600 mb-8">Create Your Own Poll</h3>
            <form 
                className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
                onSubmit={onSubmit}
            >
                <div className="mb-6">
                    <label 
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="firstOption"
                        data-testid="firstLabel"
                    >
                        First Option
                    </label>
                    <input 
                        value={firstOption}
                        onChange={(e) => inputOption(e, "1")}
                        type="text"
                        name="firstOption"
                        id="firstOption"
                        data-testid="firstOption"
                        placeholder="Enter the first option"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                </div>
                <div className="mb-6">
                    <label 
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="secondOption"
                        data-testid="secondLabel"
                    >
                        Second Option
                    </label>
                    <input 
                        value={secondOption}
                        onChange={(e) => inputOption(e, "2")}
                        type="text"
                        name="secondOption"
                        id="secondOption"
                        data-testid="secondOption"
                        placeholder="Enter the second option"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="submit"
                        data-testid="submit-poll"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
    
};

export default connect()(NewPoll);
