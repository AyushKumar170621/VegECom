class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }
    search()
    {
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",    //case insensitive
            }
        }
        :{};
        // console.log(keyword);
        this.query = this.query.find({...keyword})
        return this;
    }
    filter()
    {
        const queryCopy = {...this.queryStr};
        //remove field for category
        const removeField = ["keyword","page","limit"];
        removeField.forEach(key=>delete queryCopy[key]);
        //for prize and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        this.query=this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);
        return this;
    }
    pagination(resultPerPage)
    {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = (currentPage-1)*resultPerPage;

        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}

module.exports=ApiFeatures;