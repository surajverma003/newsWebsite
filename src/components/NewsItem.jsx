import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

export class NewsItem extends Component {
  render() {

    let { title, description, imageUrl, newsUrl } = this.props;
    document.body.style.backgroundColor = 'black'
    return (
      <>
        <div className="card my-4">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body bg-dark" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexDirection: 'column'
          }}>
            <h5 className="card-title" style={{ color: '#fff' }}>{title}</h5>
            <p className="card-text" style={{ color: 'rgb(180 179 179)' }}>{description}</p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-warning pb-2 px-3 w-50" style={{ float: 'bottom' }}>Read more</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem
