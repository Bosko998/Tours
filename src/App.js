import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  const handleRefresh = async () => {
    fetchTours()
      .then((data) => {
        setLoading(false);
        setTours(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      return tours;
      // setLoading(false);
      // setTours(tours);
    } catch (error) {
      // setLoading(false);
      console.log(error);
      return error;
    }
  };
  useEffect(() => {
    let isMounted = true;
    fetchTours()
      .then((data) => {
        if (isMounted) {
          setLoading(false);
          setTours(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setLoading(false);
          console.log(err);
        }
      });
    return () => {
      //cleanup function
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            className="btn"
            style={{ marginTop: "2rem" }}
            onClick={() => handleRefresh()}
          >
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
