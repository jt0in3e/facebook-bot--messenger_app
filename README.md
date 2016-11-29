# 🤖 Facebook Messenger bot & fb-app -->> all-in-one

## 🙌 not disclaimer
initially project is forked from [messenger-bot-tutorial](https://github.com/jw84/messenger-bot-tutorial) . All process of installation of messenger bot and relevant installation could be found [there](https://github.com/jw84/messenger-bot-tutorial).

Used technology:
--> git&github
--> nodejs
--> javascript :)
--> mongodb
--> heroku
--> bash/terminal
--> facebook/messenger
--> lovely linux :)

## 🙌 How stuff works / demo
To demostrate how it works go to facebook Page - [Footballer/Футболєр](https://www.facebook.com/footballendpoint/) and send message to the page. Or you can write post and fb-app will act accordingly.

this is demo preview . video with instruction how to use see on [Youtube](#)

![Alt text](/demo_app/2s.gif)


-------------------------------------------------------------------------


## 🙌 Main functionality

It works in two derection:
1. you could send commands to messenger-bot by starting conversation with the Page,
or 
2. post status [post] in the Page with text consisting of some commangs.



### Using messenger

Go to [Page](https://www.facebook.com/footballendpoint/) and start conversetion with messenger.
Bot understands the following command:

'''
    /event                  --> creates event for the current date {not fb-event but 'event' with its own database/mongodb/ and own managment process} and adds user to this event; post text as the Page status saying about creation of event and adding of user
'''

'''
    /list                      -->  checks whether event exists and shows/lists all users added to the event
'''

'''
    /registered         --> cheks whether event exists and shows how many users registered [count]
'''

'''
    /remove [or] "-"  --> checks whether event exists and remove registered user; sends comment to the main status of event saying that user is removed; updates count of registered and list of registered persons
'''

'''
    /add [or] "+"       --> checks whether event exists and add user to event; sends comment to the main status of event saying that user is added; updates count of registered and list of registered persons
'''

'''
    /help               --> display available commands
'''

'''
    [other text]    --> bot respones that command is not understandable
'''


### Creating event thought the Page statuses / users posts





## | |  Documented process of bot && app creation

Find on [Medium](#) detailed article on how all this were build from scratch


## @$%?

Own stuffing and developing interesting projects. Of course, all would be documented.
#Be in touch?
No problema, -->
email me,
or [tweet](https://twitter.com/engineering_lf) me,
or [view&comment&subscibe :) Youtube chnl](https://www.youtube.com/channel/UCRutklAuR4EtKzQZDatGpKA)

#| other active projects
--> works on IPTV
--> web-site on showing bad parked cars
--> license car plate recognition (in very future perspective)
