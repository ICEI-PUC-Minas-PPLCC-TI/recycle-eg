function getMustRelevantFeature(features) {
    
    console.log("Getting must relevant");
    
    if (features == null || features.length == 0) {
        console.log('there is no features to loop up');
        return null;
    }
    var highest = null;
    features.forEach(element => {
        if (highest == null || element.relevance > highest.relevance) {
            highest = element;
        }
    });
    return highest;
}