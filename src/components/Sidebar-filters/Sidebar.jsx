import "./style/Sidebar.css";

function Sidebar({setUrl}) {



    const sortOptions = (e) => {
        console.log(e.target.value)
        setUrl(e.target.value)
    }
  return (
    <aside>
      <select id="sort" onChange={(e) => sortOptions(e)}>
        <option >Sort by...</option>
        <option value="sortBy=author&sortDirection=asc">author (asc)</option>
        <option value="sortBy=author&sortDirection=desc">author (desc)</option>
        <option value="sortBy=createdAt&sortDirection=asc">created (asc)</option>
        <option value="sortBy=createdAt&sortDirection=desc">created (desc)</option>
        <option value="sortBy=upvotesCount&sortDirection=asc">up vote (asc)</option>
        <option value="sortBy=upvotesCount&sortDirection=desc">up vote (asc)</option>
      </select>
      <div>
        <p>Tags</p>
      </div>
    </aside>
  );
}

export default Sidebar;
