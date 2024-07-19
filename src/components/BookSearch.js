import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class MovieSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            Movies: [],
            loading: false,
            error: null,
            dogImageUrl: null
        };
    }

    componentDidMount() {
        this.fetchDogImage();
    }

    fetchBooks = async () => {
        const { query } = this.state;
        this.setState({ loading: true, error: null });
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
            const data = await response.json();
            this.setState({ Movies: data.docs, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };

    fetchDogImage = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            this.setState({ dogImageUrl: data.message });
        } catch (error) {
            console.error('Error fetching dog image:', error);
        }
    };

    handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value.trim();
        if (query) {
            this.setState({ query }, this.fetchBooks);
        }
    };

    render() {
        const { Movies, loading, error, dogImageUrl } = this.state;

        return (
            <div className="container">
                <div className="d-flex align-items-center my-4">
                    <img src='https://img.icons8.com/?size=100&id=81984&format=png&color=000000' alt='logo' style={{ height: '50px' }} />
                    <h1 className="ml-3" style={{ color: 'Red', fontWeight: "bold", fontFamily: "MozAnimationDelay" }}>Movie Search</h1>
                </div>
                <form onSubmit={this.handleSearch} className="mb-4">
                    <div className="input-group">
                        <input type="text" className="form-control" id="search" placeholder="Search for Movies" />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-danger">Search</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    {Movies.map(Movie => (
                        <div key={Movie.key} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                {dogImageUrl && (
                                    <img className="card-img-top" src={dogImageUrl} alt="Dog" />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'Red' }}>{Movie.title}</h5>
                                    <p className="card-text" style={{ color: '#333' }}>
                                        Author: {Movie.author_name?.join(', ')}
                                    </p>
                                    <p className="card-text" style={{ color: '#333' }}>
                                        First Publish Year: {Movie.first_publish_year}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && <p style={{ color: 'red' }}>Loading...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            </div>
        );
    }
}

export default MovieSearch;
