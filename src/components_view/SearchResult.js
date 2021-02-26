export default function SearchResult ({searchObj}) {
  return (
    <div>
      <img src={searchObj.photoURL} width="30px" />
      <span>{searchObj.displayName}</span>
      <button>Add</button>
    </div>
  );
}

