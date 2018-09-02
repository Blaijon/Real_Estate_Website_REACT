//Real Estate in his project

import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header.js'
import Filter from './Filter.js'
import Listings from './Listings.js'
import listingsData from './data/listingsData.js'

class App extends Component {
  constructor(){
    super()
    //default values
    this.state = {
      name:'Joe',
      //listingsData: listingData es6
      listingsData,
      city: 'All',
      homeType: 'All',
      bedrooms:'0',
      min_price: 0,
      max_price: 1000000,
      min_floor_space: 0,
      max_floor_space: 50000,
      elevator: false,
      gym:false,
      finished_basement: false,
      swimming_pool: false,
      filteredData: listingsData,
      populateFormsData : '',
      sortby: 'price-dsc',
      view:'long',
      search: ''

    }
    //binding functions to this APP class
    this.change = this.change.bind(this)
    this.filteredData= this.filteredData.bind(this)
    this.populateForms =this.populateForms.bind(this)
    //changes view 12 column to Listing Data. used on click method
    this.changeView = this.changeView.bind(this)
  }
  //things to happen before render//
  componentWillMount(){
    var listingsData = this.state.listingsData.sort((a, b) => {
      return a.price - b.price
    })

    this.setState({
      listingsData
    })
  }

  //function for change even condtions
  change(event){
    var name = event.target.name
    var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
//start changing the state
    this.setState({
      [name]: value
    }, () => {
      // show the changed state in console
      console.log(this.state)
      //start running the filter data function so listing can display state changes instead of default state
      this.filteredData()
    })
  }
//change the view column next to lowestprice and highest price and ochangview on listindata
  changeView(viewName){
    this.setState({
      view: viewName
    })
  }
  //the filtering function
  filteredData(){
    //store it in new varaibale newData
    //filtering price, floorspace, rooms
    var newData = this.state.listingsData.filter((item) => {
      return item.price >= this.state.min_price && item.price <=
      this.state.max_price &&
      item.floorSpace >= this.state.min_floor_space &&
      item.floorSpace <= this.state.max_floor_space
      && item.rooms >= this.state.bedrooms
    })
    //filtering city
    if(this.state.city !=="All") {
      newData = newData.filter((item) => {
        return item.city === this.state.city
      })
    }
    //filtering hometype, apartment

      if(this.state.homeType !== "All") {
      newData = newData.filter((item) => {
        return item.homeType === this.state.homeType
      })
    }
    //filtering lowest to highest

    if(this.state.sortby === 'price-dsc'){
      newData = newData.sort((a,b) => {
        return a.price - b.price
      })
    }
    //filtering price highest to lowest

    if(this.state.sortby === 'price-asc'){
      newData = newData.sort((a,b) => {
        return b.price - a.price
      })
    }
    //Searching not equal to empty string
    if(this.state.search !== ''){
      // filter data
      newData = newData.filter((item) => {
        //look through city dummy data and put it in city variable and lowercase it
        var city = item.city.toLowerCase()
        //get the searchbar and put data in variable search text
        var searchText = this.state.search.toLowerCase()
        // see if anything matches from city
        var n = city.match(searchText)
      //if n does match something return an array with the matching
        if(n != null){
          return true
        }
      })
    }
    //changing filterdata to new state with all its new data
    this.setState({
      filteredData: newData
    })
  }
  populateForms(){
    // populating the city dropdown and sorting it apahabetical order
    var cities = this.state.listingsData.map((item) => {
      return item.city
    })
    cities = new Set(cities)
    cities = [...cities]
    cities = cities.sort()
    // populating the hometype dropdown and sorting it apahabetical order

    var homeTypes = this.state.listingsData.map((item) => {
      return item.homeType
    })
    homeTypes = new Set(homeTypes)
    homeTypes = [...homeTypes]

    homeTypes= homeTypes.sort()

    // populating the bedroom dropdown and sorting it in numerical  order
    var bedrooms = this.state.listingsData.map((item) => {
      return item.rooms
    })
    bedrooms = new Set(bedrooms)
    bedrooms = [...bedrooms]

    bedrooms = bedrooms.sort();
    //changing state
    this.setState({
      populateFormsData: {
        homeTypes,
        bedrooms,
        cities
      }
    }, () => {
      // console.log(this.state)
    })


  }


  render() {

    return (

      <div>
          <Header/>
          <section id="content-area">
            <Filter change={this.change} globalState={this.state} populateAction={this.populateForms}/>
            <Listings listingsData={this.state.filteredData} change={this.change} globalState={this.state} changeView={this.changeView}/>
          </section>
      </div>
    );
  }
}

export default App;
