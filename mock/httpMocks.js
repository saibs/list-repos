const httpMocks = ($httpBackend) => {
	// define responses for requests here as usual


	// For everything else, don't mock
	$httpBackend.whenGET(/^\/*\w+.*$/).passThrough();
	$httpBackend.whenPOST(/^\/*\w+.*$/).passThrough();
};

export default httpMocks;
