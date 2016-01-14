var oldStructure = require('./old-structure.json');


var structure = {
  institution: [
    getInstitutionId(oldStructure.institution_type)
  ],

  coverage: oldStructure.coverage_type,
  entities: oldStructure.offices,
  expired_date: oldStructure.expired_date,
  location: oldStructure.location_type,
  objectives: oldStructure.objetives,

  purpose: [
    getPurposeId(oldStructure.purpose_type)
  ],

  rectory_resolution: oldStructure.ctory_resolution,
  responsibles: oldStructure.responsible,
  suscription_date: oldStructure.suscription_date,
  title: oldStructure.title,
  validity: oldStructure.validity
};


function getInstitutionId(name) {
  var institutions = require('./institutions.json');
  var institutionsId;

  Object.keys(institutions).forEach(function(key) {
    if (name == institutions[key].name) {
      institutionsId = key;
    }
  });

  // console.log(name, institutionsId);

 return institutionsId;
}

function getPurposeId(name) {
  var purposes = require('./purposes.json');
  var purposesId;

  Object.keys(purposes).forEach(function(key) {
    if (name == purposes[key].name) {
      purposesId = key;
    }
  });

  return purposesId;
}


// var id = getInstitutionId(oldStructure.institution_type);
// console.log(id);
// console.log(oldStructure);
console.log(structure);
