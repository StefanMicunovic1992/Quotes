import "./style/MainContent.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function MainContent(props) {
  const [quotes, setQuotes] = useState();
  const [allQuotesNumber, setAllQuotesNumber] = useState();
  const [pageNumber, setPageNumber] = useState(1);


  const fetchQuotes = (pageNumber) => {
    let url;
    if(props.url !== undefined && props.url !=='Sort by'){
      url = `http://localhost:3000/quotes?page=${pageNumber}&pageSize=5&${props.url}`
    }else{
      url = `http://localhost:3000/quotes?page=${pageNumber}&pageSize=5`
    }
    axios
      .get(url)
      .then((res) => {
        setQuotes(res.data.quotes);
        setAllQuotesNumber(res.data.quotesCount);
      });
  };

  useEffect(() => {
    fetchQuotes(pageNumber);
  },[props.url]);

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

  const voteFnc = (e) => {
    console.log(e.target.parentElement.parentElement.getAttribute("data-id"));
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
}

  return (
    <main>
      <section id="sectionForRenderingQuotes">
        {quotes?.map((element) => (
          <article className="quote" key={element.id}>
            <div className="rating" data-id={element.id}>
              <FontAwesomeIcon
                icon={faCaretUp}
                className="icons"
                onClick={(e) => voteFnc(e)}
              />
              {calculatePercentages(
                element.upvotesCount,
                element.downvotesCount
              )}
              <span>
                {element.upvotesCount}/{element.downvotesCount}
              </span>
              <FontAwesomeIcon icon={faCaretDown} className="icons" />
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
            <FontAwesomeIcon icon={faArrowLeft} className="icons" onClick={previousPage}/>
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
