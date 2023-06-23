export default function Search(props) {
  const onChange = (event) => {
    props.onChangeSearchText(event);
  };

  return (
    <div className="search">
      <input
        className="my-search"
        type="text"
        placeholder="tìm kiếm..."
        onChange={onChange}
      />
    </div>
  );
}
