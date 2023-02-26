import axios from "axios";
import { useEffect, useState } from "react";
import "./style/Sidebar.css";

function Sidebar({ setUrl }) {
  const [tags, setTags] = useState();
  const [urlOfsort, setUrlOfSort] = useState();
  const [urloftags, setUrlOfTags] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000/tags").then((res) => {
      setTags(res.data);
    });
  }, []);

  useEffect(() => {
    if(urloftags !== undefined && urlOfsort !== undefined && urlOfsort !== 'Sort by...'){
        const url = `${urlOfsort}&${urloftags}`;
        setUrl(url);
        return 
    }else if(urloftags !== undefined){
        setUrl(urloftags);
        return
    }else if(urlOfsort !== undefined && urlOfsort !== 'Sort by...'){
        setUrl(urlOfsort);
    }else{
      setUrl(undefined);
    }
  }, [urlOfsort,urloftags]);

  const sortOptions = (e) => {
    setUrlOfSort(e.target.value)
    setUrl(e.target.value);
  };

  const tagsFilterFnc = (e) => {
    const allCheckbox = document.querySelectorAll(".inputCheckbox");

    let urlTags = "tags=";
    allCheckbox.forEach((elem) => {
      if (elem.checked) {
        urlTags += elem.getAttribute("data-name") + ",";
      }
    });
    if (urlTags.length > 5) {
      urlTags = urlTags.substring(0, urlTags.length - 1);
      setUrlOfTags(urlTags)
    }else{
        setUrlOfTags(undefined)
    }    
};

const ShowHideFilters = () => {
    document.getElementById('tags').classList.toggle('hideTags')
    document.getElementById('tags').classList.toggle('showTags')
}

  return (
    <aside>
      <select id="sort" onChange={(e) => sortOptions(e)}>
        <option >Sort by...</option>
        <option value="sortBy=author&sortDirection=asc">author (asc)</option>
        <option value="sortBy=author&sortDirection=desc">author (desc)</option>
        <option value="sortBy=createdAt&sortDirection=asc">
          created (asc)
        </option>
        <option value="sortBy=createdAt&sortDirection=desc">
          created (desc)
        </option>
        <option value="sortBy=upvotesCount&sortDirection=asc">
          up vote (asc)
        </option>
        <option value="sortBy=upvotesCount&sortDirection=desc">
          up vote (asc)
        </option>
      </select>
      <div id="tagsFilter">
        <button id="tagsFilterBtn" onClick={ShowHideFilters}>Tags filter</button>
        <div id="tags" className="hideTags">
          {tags?.map((element) => (
            <div key={element} className="tagElement">
              <input
              id={element}
                className="inputCheckbox"
                type="checkbox"
                data-name={element}
                onChange={(e) => tagsFilterFnc(e)}
              />
              <label htmlFor={element}>{element}</label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
