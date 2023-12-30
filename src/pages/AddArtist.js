function AddArtist() {
    return ( <div className="AddArtist">
        <h1>Add Artist</h1>
        <form>
            <label>Artist Name</label>
            <input type="text" placeholder="Artist Name" />
            <label>Artist Image</label>
            <input type="file"  accept=".jpg, .jpeg, .png, .gif, .webp" placeholder="Artist Image" />
            <button>Add Artist</button>
        </form>
    </div> );
}

export default AddArtist;