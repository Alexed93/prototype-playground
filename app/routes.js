//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

////// Vicky Teinaki 
////// https://www.vickyteinaki.com/blog/more-efficient-prototyping-with-the-gov-uk-prototype-kit-step-by-step/

// Logging session data  
router.use((req, res, next) => {    
    const log = {  
      method: req.method,  
      url: req.originalUrl,  
      data: req.session.data  
    }  
    console.log(JSON.stringify(log, null, 2))  
   
  next()  
}) 

// GET SPRINT NAME - useful for relative templates  
router.use('/', (req, res, next) => {  
  res.locals.currentURL = req.originalUrl; //current screen  
  res.locals.prevURL = req.get('Referrer'); // previous screen  
  req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'  
  req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'  
  res.locals.folder = req.folder; // what folder the url is  
  res.locals.subfolder = req.subfolder; // what subfolder the URL is in

  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );  
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );  
next();  
});  

// Add your routes here


// Start folder specific routes
router.use('/sprint-1', require('./views/sprint-1/\_routes'));  
// current sprint, remember to add older sprint when adding a new folder!  
router.use('/current', require('./views/current/\_routes'));