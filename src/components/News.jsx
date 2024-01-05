import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';

export default class News extends Component {

  constructor(props) {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 1803
    }
  }

  loadData = async () => {
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-01-10&to=2024-01-10&sortBy=popularity&apiKey=9107149b8e9845b899a62c6424aaf4a9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();

    this.setState({
      articles: data.articles
    });
  }

  componentDidMount() {
    this.loadData()
  }

  previous = async () => {
    let url = `https://newsapi.org/v2/everything?q=apple&from=2024-01-10&to=2024-01-10&sortBy=popularity&apiKey=9107149b8e9845b899a62c6424aaf4a9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let response = await fetch(url);
    let data = await response.json();

    this.setState({
      articles: data.articles,
      page: this.state.page - 1,
      totalResults: data.totalResults,
      loading: false
    });
  }

  next = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/everything?q=apple&from=2024-01-10&to=2024-01-10&sortBy=popularity&apiKey=9107149b8e9845b899a62c6424aaf4a9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let response = await fetch(url);
      let data = await response.json();

      this.setState({
        articles: data.articles,
        page: this.state.page + 1,
        loading: false
      });
    }
  }

  gridObj = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(50px,1fr))',
    gridGap: '1rem'
  }

  render() {
    return (
      <div className='py-5 px-2'>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className='text-center text-light mb-4'>NewsMonkey - Top Headlines</h2>
              {this.state.loading && <Spin />}
            </div>
          </div>
        </div>

        {/* <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between">
              <button className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.previous}>Previous</button>
              <button className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.next}>Next</button>
            </div>
          </div>
        </div> */}

        <div className="container">
          <div className="row">

            {
              !this.state.loading && this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" style={this.gridObj} key={index}>
                    <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ''} imageUrl={!element.urlToImage ? 'https://blog.fluidui.com/assets/images/posts/imageedit_1_9273372713.png' : element.urlToImage} newsUrl={element.url} />
                  </div>
                )
              })
            }

          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between">
              <button className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.previous}>Previous</button>
              <button className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.next}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
