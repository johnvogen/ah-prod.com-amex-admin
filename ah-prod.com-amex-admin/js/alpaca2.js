
      var platform;
var repository;
var branch;
var node;
var repositoryId = 'f2c3571d7a2955e7f8a1';
var branchId = '7935c19b649b9c399528';
//var nodeId = '5b5019bc3683e8438699'; //counter node
var schemaSource;
var optionsSource;
var dataSource;
//var pageIdToLoad = "21f5c2a082ab59f6391b";
var pageIdToLoad;
var username;
var password;

var value;
var previewObject;

var applicationId = 'c8a4dc1dd5644f2934be'; // to be provided for amex app
var emailProviderId = '2c4497662def5cde8e96';//from amex app
var workflowId = 'amexWorkflow';
var projectId = '06fea8ff21b87b9e8358';
var draftNodeId;
//Switching from local developement to production will require switching config objects

function getPage(callback) {

    //            var config = {
    //            "username": username,
    //            "password": password,
    //            "baseURL": "/proxy"
    //                    }

    var config = {
        "clientKey": "1bd1ddc4-37c7-4c80-b69b-b0d8d226cc34",
        "clientSecret": "CamxJ6k/aNYbuZVV1uTox0imFpsURRugGjt/AD77DGENmJ+U87Z1eh4KBdKtCcY8/Regd9DH8DYWGJ2mcdSCsK3a+aX1WR2ftnxQQ8yg6ck=",
        "username": username,
        "password": password,
        "baseURL": "https://api.cloudcms.com",
        "application": "c8a4dc1dd5644f2934be"
    }


    $("#dialog").dialog("close");

    Gitana.connect(config, function(err) {
        if (err) {
            console.log("Error: " + err + window.location.href);
            //$("#loading-image").css('display', 'none');

            $("#lblLoginLable").html("Username or password are incorrect. Please try again.");
            $("#dialog").dialog("open");
            return;

        }
    }).then(function() {
        platform = this;
        document.cookie = "username=" + username;
        document.cookie = "password=" + password;

        this.readRepository(repositoryId).then(function() {
            repository = this;


            this.readBranch(branchId).then(function() {
                branch = this;
                /*
                        node = this.readNode(pageIdToLoad).then(function () {
                            callback && callback();
  
                        });
                    
                    */

            });
        });
    });
}

var myData = {/*
    "5c5fb3b173fbb1185b4d": "medical",
    "1797d83ab34843aa7ab9": "medical-hmo",
    "52bbfd6e6174e9ca77f7": "credit-union",
    "a652ad09a0a4462255bb": "dental",
    "0db105fc906afd2a8494": "medical-consumer",
    "c2417312cad4bf36cce6": "gesop",
    "abc86af69ab6477794ab": "medical-hsa",
    "487777503a2025303fec": "medical-wellness",
    "f2566b4b4bd18f383249": "medical-ppo",
    "b883c2dca4f15f11019f": "life-accident",
    "ee95b728317147bb79d6": "employee-asst",
    "f5be44d832f9e77d6e85": "leave-absence",
    "7b5c1d7200327b2be55a": "index",
    "b073cb57ee6187722d75": "educational-asst",
    "614e4f07b7874ccb7a08": "maternity-resources",
    "b825e1ee2d42b2767c35": "adoption-asst",
    "e5a18ae298b211790f7e": "workflex",
    "a3b3f7b9777c2b17d8fe": "open_enrollment",
    "a80289b42b88610a7651": "voluntary",
    "4b948eecd3345ced09bc": "vision",
    "252be9349d6efd0312d4": "new_hires",
    "89d455783efde8f39be7": "myResources",
    "21f5c2a082ab59f6391b": "401k-plan",
    "67a22456135d7668e21a": "fsa-hsa"*/
    "d9275c2e2cac27215841": "American Express",
    "35fdcd1a842f9bd38093": "Be Healthier",
    "24faf2f946aaaf4df61c": "Care for Family",
    "e598bce4cbbc130ca67c": "Chat Money Expert",
    "2f459081ab8e3cbe5e44": "Contact Us",
    "baee9580b9b08558d6a1": "Core Benefits",
    "5e9bfb25da6e1274d3bf": "Education Benefits",
    "27936ab42ee296645389": "Family Expense",
    "4504e3b77aa2bbd9592f": "Get Help Health Care",
    "8399f467a5165c36718f": "Get Ready To Enroll",
    "c4428f3933404834e0db": "Get Specialized Health",
    "fc3b2067976ea86d472f": "Lower Expenses",
    "1ff9c71fef8aadd38466": "Pregnancy Adoption Benefits",
    "cd9b943b651016db032e": "Protect family Financially",
    "9706e1042e10ba5483df": "Save For The Future",
    "341faff00653a2a45b04": "See Doctor",
    "8fc2f47c2238f5614da0": "Special Support For Family",
    "fdc79e68d1f59a1c5c35": "Spend money"

}

$("#myDropdown").alpaca({
    "options": {
        "label": "What page would you like to edit?",
        "type": "select",
        //"dataSource": { "5c5fb3b173fbb1185b4d": "medical.html" }
        "dataSource": myData
    }
});


$("#myDropdownHistory").alpaca({
    "options": {
        "label": "What page would you like to revert?",
        "type": "select",
        //"dataSource": { "5c5fb3b173fbb1185b4d": "medical.html" }
        "dataSource": myData
    }
});

$("#myDropdown").change(loadPage);

function loadPage() {

    pageIdToLoad = $("#alpaca1").val() || "21f5c2a082ab59f6391b";

    reShowForm();
}




var timer;

function setTimer() {
    timer = setTimeout(function() {
        location.reload();
    }, 900000);
}

function clearTimer() {
    clearTimeout(timer);
}


function reShowForm() {

    clearTimer();
    console.log("Timer Cleared");
    setTimer();
    console.log("Timer Set");

    node = branch.readNode(pageIdToLoad).then(function() {

        if (pageIdToLoad == "89d455783efde8f39be7") {
            //showResourcesForm();
        } else if (pageIdToLoad == "a3b3f7b9777c2b17d8fe") {
            //showEnrollmentForm();
        } else if (pageIdToLoad == "7b5c1d7200327b2be55a") {
            //showHomepageForm();
        } else {
            showAmexForm();
        }




    });


}


function showAmexForm() {

    console.log("show amex form");
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "testAmex",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "name"
                },
                "heading": {
                    "type": "string",
                    "title": "heading"
                },
                "title": {
                    "type": "string",
                    "title": "title"
                },
                "prefix": {
                    "type": "string",
                    "title": "prefix"
                },
                "flag": {
                    "type": "string",
                    "title": "flag"
                },
                "body": {
                    "type": "string",
                    "title": "body"
                },
                "topics": {
                    "type": "array",
                    "title": "Topics",
                    "items": {
                        "properties": {
                            "topicHeader": {
                                "type": "string",
                                "title": "Topic Header"
                            },
                            "topicTitle1": {
                                "type": "string",
                                "title": "topicTitle1"
                            },
                            "items": {
                                "type": "array",
                                "title": "Sblob Items",
                                "items": {
                                    "type": "object",
                                    "title": "Item",
                                    "properties": {
                                        "link": {
                                            "type": "string",
                                            "title": "item Link Url"
                                        },
                                        "sblob": {
                                            "type": "string",
                                            "title": "sblob Description"
                                        }
                                    }
                                }
                            },
                            "rich_blobs": {
                                "items": {
                                    "type": "string",
                                    "title": "rblobsItems"
                                },
                                "type": "array",
                                "title": "rblobs"
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "description": "custom:testame0",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "Preview": {
                        "click": function () {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            value = this.getValue();
                            
                            var valueJson = JSON.stringify(value);
                            console.log(valueJson);
                            

                            branch.createNode({
                                "name": value.name,
                                "heading": value.heading,
                                "title": value.title,
                                "prefix": value.prefix,
                                "flag": 'amexPage1Draft',
                                "body": value.body,
                                "topics": value.topics,
                                "_type": 'custom:testame0'
                            }).then(function () {
                                draftNodeId = this._doc;
                                window.open('http://qa.aonhewittdev.com:10080/amextest/' + value.name + '.html' + '?draft=' + this._doc, '_blank');
                            });

                            //alert(JSON.stringify(value, null, "  "));

                            //node.name = value.name;
                            //node.heading = value.heading;
                            //node.title = value.title;
                            //node.prefix = value.prefix;
                            //node.flag = value.flag;
                            //node.body = value.body;
                            //node.topics = value.topics;
                            //node.update().then(function () {
                            //    alert("Form Submitted")
                            //});
                        }
                    },
                    "submit": {
                        "click": function () {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            //var value = this.getValue();
                            //alert(JSON.stringify(value, null, "  "));

                            //node.name = value.name;
                            //node.heading = value.heading;
                            //node.title = value.title;
                            //node.prefix = value.prefix;
                            //node.flag = value.flag;
                            //node.body = value.body;
                            //node.topics = value.topics;
                            sendEmail(); //object must be created on cloudCMS before email can be sent
                            //node.update().then(function () {
                            //alert("Form Submitted")
                            //});
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "heading": {
                    "type": "text"
                },
                "title": {
                    "type": "text"
                },
                "prefix": {
                    "type": "text"
                },
                "flag": {
                    "type": "text"
                },
                "body": {
                    "type": "ckeditor"
                },
                "topics": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });

    $('.alpaca-form-button-Preview').append('Preview');
}

function sendEmail() {
    console.log("sending email with draft node Id of " + draftNodeId);

    node.subchain(platform).then(function () {

        var workflowConfig = {};
        workflowConfig.context = {};
        workflowConfig.context.projectId = projectId;
        workflowConfig.payloadType = "content";
        workflowConfig.payloadData = {
            "repositoryId": repositoryId,
            "branchId": branchId
        };
        workflowConfig.runtime = {};
        workflowConfig.runtime.applicationId = applicationId;
        workflowConfig.runtime.emailProviderId = emailProviderId;
        platform.createWorkflow(workflowId, workflowConfig).then(function () {
            this.addResource(node);
            var data = {
                "draftNodeId": draftNodeId
            }
            this.start(data).then(function () {

            });
        });
    });
}


function showHomepageForm() {

    console.log("show homepage form");
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "homePage",
            "description": "A data type to support the home page.",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "name",
                    "readonly": false,
                    "disallow": []
                },
                "tile1": {
                    "type": "string",
                    "title": "tile1",
                    "readonly": false,
                    "disallow": []
                }
            },
            "_parent": "n:node",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function () {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                            //alert(JSON.stringify(value, null, "  "));
                            node.name = value.name;
                            node.tile1 = value.tile1;
                            node.update().then(function () {
                                alert("Form Submitted")
                            });
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "tile1": {
                    "type": "ckeditor"
                }
            }
        }
    });
}




function showForm() {
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "Edit Page",
            "type": "object",
            "properties": {
                "body": {
                    "type": "string",
                    "title": "Main Body"
                },
                "links": {
                    "type": "array",
                    "title": "Helpful Links",
                    "items": {
                        "properties": {
                            "company": {
                                "type": "string",
                                "title": "company"
                            },
                            "number": {
                                "type": "string",
                                "title": "number"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            }
                        },
                        "type": "object"
                    }
                },
                "iWantTo": {
                    "type": "array",
                    "title": "Accordion Section 1",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }



                        },
                        "type": "object"
                    }
                },
                "iWantTo2": {
                    "type": "array",
                    "title": "Accordion Section 2",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function() {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                            //alert(JSON.stringify(value, null, "  "));
                            node.name = value.name;
                            node.heading = value.heading;
                            node.body = value.body;
                            node.leftImage = value.leftImage;
                            //node.links = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.links)));
                            node.links = value.links;
                            node.accordionSection1Header = value.accordionSection1Header;
                            //node.iWantTo = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo)));                             
                            node.iWantTo = value.iWantTo;
                            node.accordionSection2Header = value.accordionSection2Header;
                            //node.iWantTo2 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo2)));
                            node.iWantTo2 = value.iWantTo2;
                            node.update().then(function() {
                                alert("Form Submitted")
                            });
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "body": {
                    "type": "ckeditor"
                },
                "image": {
                    "type": "text"
                },
                "links": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });

} //alpaca   





function showResourcesForm() {
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "newResources",
            "type": "object",
            "properties": {
                "generalBenefits": {
                    "type": "array",
                    "title": "generalBenefits",
                    "items": {
                        "type": "object",
                        "title": "item",
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        }
                    }
                },
                "consumerism": {
                    "type": "array",
                    "title": "consumerism",
                    "items": {
                        "type": "object",
                        "title": "item",
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        }
                    }
                },
                /*
                        "communications": {
                            "type": "array",
                            "title": "communications",
                            "items": {
                                "type": "object",
                                "title": "item",
                                "properties": {
                                    "description": {
                                        "type": "string",
                                        "title": "description"
                                    },
                                    "link": {
                                        "type": "string",
                                        "title": "link"
                                    }
                                }
                            }
                        },
                        "enrollment": {
                            "type": "array",
                            "title": "enrollment",
                            "items": {
                                "type": "object",
                                "title": "item",
                                "properties": {
                                    "description": {
                                        "type": "string",
                                        "title": "description"
                                    },
                                    "link": {
                                        "type": "string",
                                        "title": "link"
                                    }
                                }
                            }
                        },*/
                "forms": {
                    "type": "array",
                    "title": "forms",
                    "items": {
                        "type": "object",
                        "title": "item",
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        }
                    }
                }
            },
            "_parent": "n:node",
            "items": {},
            "description": "custom:newresources0",
            "$schema": "http://json-schema.org/draft-04/schema#"
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function() {
                            clearTimer();//Auto logout feature
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();


                            node.generalBenefits = value.generalBenefits;
                            node.consumerism = value.consumerism;
                            node.communications = value.communications;
                            node.enrollment = value.enrollment;
                            node.forms = value.forms;
                            node.update().then(function() {
                                alert("Resources Form Submitted")
                            });

                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "body": {
                    "type": "ckeditor"
                },
                "image": {
                    "type": "text"
                },
                "links": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });

} //alpaca 

function showEnrollmentForm() {
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "newOpenEnrollment",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "name"
                },
                "heading": {
                    "type": "string",
                    "title": "heading"
                },
                "body": {
                    "type": "string",
                    "title": "body"
                },
                "leftImage": {
                    "type": "string",
                    "title": "image"
                },
                "links": {
                    "type": "array",
                    "title": "Helpful Links",
                    "maxItems": 30,
                    "items": {
                        "properties": {
                            "linkHeader": {
                                "type": "string",
                                "title": "linkHeader"
                            },
                            "company": {
                                "type": "string",
                                "title": "company"
                            },
                            "number": {
                                "type": "string",
                                "title": "number"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection1Header": {
                    "type": "string",
                    "title": "Accordion Section 1 Header"
                },
                "iWantTo": {
                    "type": "array",
                    "title": "Accordion Section 1",
                    "items": {
                        "properties": {
                            "bullet": {
                                "type": "string",
                                "title": "billetItem"
                            },
                            "description": {
                                "items": {
                                    "type": "string",
                                    "title": "descriptionItem"
                                },
                                "type": "array",
                                "title": "description"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection2Header": {
                    "type": "string",
                    "title": "Accordion Section 2 Header"
                },
                "iWantTo2": {
                    "type": "array",
                    "title": "Accordion Section 2",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection3Header": {
                    "type": "string",
                    "title": "Accordion Section 3 Header"
                },
                "iWantTo3": {
                    "type": "array",
                    "title": "Accordion Section 3",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection4Header": {
                    "type": "string",
                    "title": "Accordion Section 4 Header"
                },
                "iWantTo4": {
                    "type": "array",
                    "title": "Accordion Section 4",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection5Header": {
                    "type": "string",
                    "title": "Accordion Section 5 Header"
                },
                "iWantTo5": {
                    "type": "array",
                    "title": "Accordion Section 5",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "description": "custom:newopenenrollmen0",
            "$schema": "http://json-schema.org/draft-04/schema#"
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function() {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                    


                    
                            node.name = value.name;
                            node.heading = value.heading;
                            node.body = value.body;
                            node.leftImage = value.leftImage;

                            //node.links = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.links)));
                            node.links = value.links;

                            node.accordionSection1Header = value.accordionSection1Header;

                            //node.iWantTo = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo)));                             
                            node.iWantTo = value.iWantTo;

                            node.accordionSection2Header = value.accordionSection2Header;

                            //node.iWantTo2 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo2)));
                            node.iWantTo2 = value.iWantTo2;

                            node.accordionSection3Header = value.accordionSection3Header;

                            //node.iWantTo3 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo3)));
                            node.iWantTo3 = value.iWantTo3;

                            node.accordionSection4Header = value.accordionSection4Header;

                            //node.iWantTo4 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo4)));
                            node.iWantTo4 = value.iWantTo4;

                            node.accordionSection5Header = value.accordionSection5Header;

                            //node.iWantTo5 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo5)));
                            node.iWantTo5 = value.iWantTo5;







                            node.update().then(function() {
                                alert("Open enrollment Form submitted");
                            });

                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "body": {
                    "type": "ckeditor"
                },
                "image": {
                    "type": "text"
                },
                "links": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });

} //alpaca   









//This is form upload scripting here--------------------------------------------
var pdfContainerId = 'f2585ff41013540945ab';

function submitForm() {
    var formData = new FormData($("#frmeditSubmitForm5")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmeditSubmitForm5");

    $.ajax({
        type: "POST",
        url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + pdfContainerId + "/attachments/" + ($("#uploadFilenameEdit5").val()).replace(" ", "_") + "/",
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            authorization: authorizationHeader
        }
    });
}

//This ends form upload scripting-----------------------------------------------


function checkCookie() {

    if (performance.navigation.type == 1) {
        console.log('page reloaded');
        Gitana.deleteCookie("password", "/ah-prod.com-amex-admin");
        Gitana.deleteCookie("username", "/ah-prod.com-amex-admin");
        Gitana.deleteCookie("password", "/localhost");
        Gitana.deleteCookie("username", "/localhost");
        Gitana.deleteCookie("password", "/");
        Gitana.deleteCookie("username", "/");

    }

    console.log('checking cookies');
    var user = getCookie("username");
    var pswd = getCookie("password");
    if (user != "" && pswd != "") {
        console.log("Welcome again " + user);
        username = user;
        password = pswd;
        loadPage();
    } else {
        $("#loginContainer").append('<div id="dialog" title="Please Log In."><label>Username:</label><input id="txtUsername" name="txtUsername" type="text"><label>Password:</label><input id="txtPassword" name="txtPassword" type="password"><input id="submitButton" onclick="setCredentialsFromLogin()" name="Submit" type="button" value="Submit"><label id="lblLoginLable"></label></div>');
        $("#dialog").dialog({
            modal: true,
            draggable: false,
            width: "auto",
            position: {
                my: "top",
                at: "center",
                of: window
            },
            create: function(event, ui) {
                $(this).css("maxWidth", "300px");
            }

        });


        $(".selector").dialog("open");
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCredentialsFromLogin() {
    username = $("#txtUsername").val();
    password = $("#txtPassword").val();
    getPage(showForm);
}



function logout() {
    Gitana.deleteCookie("password", "/ah-prod.com-amex-admin");
    Gitana.deleteCookie("username", "/ah-prod.com-amex-admin");
    Gitana.deleteCookie("password", "/localhost");
    Gitana.deleteCookie("username", "/localhost");
    Gitana.deleteCookie("password", "/");
    Gitana.deleteCookie("username", "/");

    platform.logout();
    open("alpaca2.html", "_self");
}




var fl = document.getElementById('myFileUpload5');

fl.onchange = function(e) {
    var ext = this.value.match(/\.(.+)$/)[1];
    switch (ext) {
        case 'pdf':
            console.log('pdf file type allowed');
            break;
        case 'xls':
            console.log('xls file type allowed');
            break;
        case 'xlsx':
            console.log('xlsx file type allowed');
            break;
        default:
            alert('Only pdf or xls/xlsx files may be uploaded');
            this.value = '';
    }
};


$("#uploadFilenameEdit5").on('change keyup paste mouseup', function() {
    $("#myFileName").html($("#uploadFilenameEdit5").val());
});


    $("[data-alpaca-container-item-name^='topics_0_topicHeader']:first-child").addClass("greenBackground");
    $("[data-alpaca-container-item-name^='topics_0_topicHeader']").addClass("greenBackground");


    function myButton() {
        alert(node.title);

    }