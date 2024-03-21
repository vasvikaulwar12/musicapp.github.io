import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import "./App.css";

// Component to render star rating
const StarRating = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span key={index}>
            <FaStar color={currentRating <= rating ? "#ffc107" : "#e4e5e9"} />
          </span>
        );
      })}
    </div>
  );
};

function App() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please give a rating!");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }

    const newData = {
      rating: rating,
      title: title,
      description: description
    };
    setSubmittedData([...submittedData, newData]);

    // Resetting the form
    setRating(null);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div style={{ border: "1px solid black", width: "500px", height: "500px", margin: "50px 100px 50px 400px", textAlign: "center", borderRadius: "10px", float: "left" }}>
        <h3>Give Rating*</h3>
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input type="radio" name="rating" value={currentRating} onClick={() => setRating(currentRating)} />
              <FaStar className="star" size={50} color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(null)} />
            </label>
          );
        })}

        <p>Your rating is: {rating}</p>

        <form onSubmit={handleFormSubmit}>
          <div style={{ margin: "auto", width: "80%", textAlign: "left", padding: "10px" }}>
            <label>Title*</label>
            <br />
            <input type='text' style={{ width: "100%", height: "30px", marginBottom: "10px" }} value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Describe</label>
            <br />
            <textarea style={{ width: "400px" }} id="description" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type='submit' style={{ padding: "10px 20px", color: "white", backgroundColor: "blue", borderRadius: "5px", border: "1px solid blue", margin: "30px" }}>Submit</button>
        </form>
      </div>

      {/* Display submitted data */}
      <div style={{ float: "left", marginLeft: "20px",marginTop:"50px",border:"1px solid black",borderRadius:"10px",padding:"20px" }}>
        <h3 style={{marginTop:"0"}}>Submitted Reviews</h3>
        {submittedData.map((data, index) => (
          <div key={index}>
            <p>Rating: <StarRating rating={data.rating} /></p>
            <p>Title: {data.title}</p>
            {data.description && <p>Description: {data.description}</p>}
            <hr />
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
