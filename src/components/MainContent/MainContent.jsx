import "./style/MainContent.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function MainContent(props) {
  const [quotes, setQuotes] = useState();
  const [allQuotesNumber, setAllQuotesNumber] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const fetchQuotes = (pageNumber) => {
    let url;
    if (props.url !== undefined && props.url !== "Sort by") {
      url = `http://localhost:3000/quotes?page=${pageNumber}&pageSize=5&${props.url}`;
    } else {
      url = `http://localhost:3000/quotes?page=${pageNumber}&pageSize=5`;
    }
    axios.get(url).then((res) => {
      setQuotes(res.data.quotes);
      setAllQuotesNumber(res.data.quotesCount);
    });
  };

  useEffect(() => {
    let newPageNumber = 1;
    setPageNumber(1);
    fetchQuotes(newPageNumber);
  }, [props.url]);

  useEffect(() => {
    let voteObject = {
      upVote: [],
      downVote: [],
    };
    sessionStorage.setItem("vote", JSON.stringify(voteObject));
  }, []);

  const calculatePercentages = (upVote, downVote) => {
    const percentage = Math.round((upVote / (upVote + downVote)) * 100);
    if (percentage <= 30) {
      return <span className="red percentage">{percentage}%</span>;
    } else if (percentage > 30 && percentage <= 50) {
      return <span className="orange percentage">{percentage}%</span>;
    } else if (percentage > 50 && percentage <= 65) {
      return <span className="yellow percentage">{percentage}%</span>;
    } else if (percentage > 65 && percentage <= 85) {
      return <span className="lightGreen percentage">{percentage}%</span>;
    } else if (percentage > 85) {
      return <span className="green percentage">{percentage}%</span>;
    }
  };

  const upVoteFnc = (e, elementId) => {
    
    const setUpVote = (element, idForVote) => {
      axios
        .post(`http://localhost:3000/quotes/${idForVote}/upvote`)
        .then((res) => {
          element.classList.toggle("triangleUp");
          element.classList.toggle("voteUp");
          element.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute(
            "disabled",
            ""
          );
        })
        .catch((error) => console.log(error));
    };

    const deleteVote = (element, idForVote) => {
      axios
        .delete(`http://localhost:3000/quotes/${idForVote}/upvote`)
        .then((res) => {
          console.log(res);
          element.classList.toggle("triangleUp");
          element.classList.toggle("voteUp");
          element.nextElementSibling.nextElementSibling.nextElementSibling.removeAttribute(
            "disabled"
          );
        })
        .catch((error) => console.log(error));
    };

    let vote = sessionStorage.getItem("vote");
    vote = JSON.parse(vote);
    const element = e.target;
    if (vote.upVote.includes(elementId)) {
      const index = vote.upVote.indexOf(elementId);
      const x = vote.upVote.splice(index, 1);
      sessionStorage.setItem("vote", JSON.stringify(vote));
      deleteVote(element, elementId);
    } else {
      vote.upVote.push(elementId);
      sessionStorage.setItem("vote", JSON.stringify(vote));
      setUpVote(element, elementId);
    }
  };

  const downVoteFnc = (e, elementId) => {
    const setDownVote = (element, idForVote) => {
      axios
        .post(`http://localhost:3000/quotes/${idForVote}/downvote`)
        .then((res) => {
          console.log(res);
          element.classList.toggle("triangleDown");
          element.classList.toggle("voteDown");
          element.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute(
            "disabled",
            ""
          );
        })
        .catch((error) => console.log(error));
    };

    const deleteVote = (element, idForVote) => {
      axios
        .delete(`http://localhost:3000/quotes/${idForVote}/downvote`)
        .then((res) => {
          console.log(res);
          element.classList.toggle("triangleDown");
          element.classList.toggle("voteDown");
          element.previousElementSibling.previousElementSibling.previousElementSibling.removeAttribute(
            "disabled"
          );
        })
        .catch((error) => console.log(error));
    };

    let vote = sessionStorage.getItem("vote");
    vote = JSON.parse(vote);
    const element = e.target;
    const idForVote = elementId;
    if (vote.downVote.includes(elementId)) {
      const index = vote.downVote.indexOf(elementId);
      const x = vote.downVote.splice(index, 1);
      sessionStorage.setItem("vote", JSON.stringify(vote));
      deleteVote(element, idForVote);
    } else {
      vote.downVote.push(idForVote);
      sessionStorage.setItem("vote", JSON.stringify(vote));
      setDownVote(element, idForVote);
    }
  };

  const previousPage = () => {
    let newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
    fetchQuotes(newPageNumber);
  };

  const nextPage = () => {
    let newPageNumbre = pageNumber + 1;
    setPageNumber(newPageNumbre);
    fetchQuotes(newPageNumbre);
  };

  const checkIsUserUpVote = (element) => {
    if (element.givenVote === "none" || element.givenVote === "downvote") {
      return <input type="button" className="triangleUp" onClick={(e) => upVoteFnc(e,element.id)}/>
    }else if(element.givenVote === "upvote"){
      return <input type="button" className="voteUp" onClick={(e) => upVoteFnc(e,element.id)}/>
    }
  };

  const checkUserDownVote = (element) => {
    if(element.givenVote === 'none' || element.givenVote === 'upvote'){
      return <input type="button" className="triangleDown" onClick={(e) => downVoteFnc(e,element.id)}/>
    }else if(element.givenVote === 'downvote'){
      return <input type="button" className="voteDown" onClick={(e) => downVoteFnc(e,element.id)}/>
    }
  }

  return (
    <main>
      <section id="sectionForRenderingQuotes">
        {quotes?.map((element) => (
          <article className="quote" key={element.id}>
            <div className="rating" data-id={element.id}>
              {checkIsUserUpVote(element)}
              {calculatePercentages(
                element.upvotesCount,
                element.downvotesCount
              )}
              <span>
                {element.upvotesCount}/{element.downvotesCount}
              </span>
              {checkUserDownVote(element)}
            </div>
            <div className="content">
              <p>{element.content}</p>
              <span>- {element.author}</span>
            </div>
          </article>
        ))}
        <article id="pagination">
          {pageNumber === 1 ? (
            <FontAwesomeIcon icon={faArrowLeft} className="hideIcon" />
          ) : (
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="icons"
              onClick={previousPage}
            />
          )}
          <span>
            {pageNumber} / {Math.ceil(allQuotesNumber / 5)}
          </span>
          {pageNumber === Math.ceil(allQuotesNumber / 5) ? (
            <FontAwesomeIcon icon={faArrowRight} className="hideIcon" />
          ) : (
            <FontAwesomeIcon
              icon={faArrowRight}
              className="icons"
              onClick={nextPage}
            />
          )}
        </article>
      </section>
    </main>
  );
}

export default MainContent;
