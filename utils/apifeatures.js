class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){//to search keywords
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword, // regex regular expression mongodb operator
                $options:"i",
            },
        }:{}; 
       
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){ //copy
        const queryCopy = {...this.queryStr}
        //Removing some fields for category
        const removeFeilds = ["keyword","page","limit"];
        removeFeilds.forEach(key=>delete queryCopy[key]);
        //filter price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
    
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
}
  
module.exports = ApiFeatures;