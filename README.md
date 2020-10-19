# todo

Project for TOP.

Notes:
  Try not to get too caught up on styling before the javascript is all complete.
Just makes things more confusing.
  Try to organize everything into objects. Makes the code more readable.
  Need to work on organizing my dom manip better.
  Everything about printing to the browser should be its own object/set of
objects. The bulk of the code should not be too tightly coupled with what is 
going on in the browser.
  If I was doing this project again, I would approach the forms entirely differently. They're a mess as is-- I could probably use mixins to create two different forms rather than dynamically change the form; intend to go back and refactor this later, maybe once I've learned a framework because dealing with tons of dom element creation and management is a pain at this scale already
  To be honest, the this keyword still confuses me profusely. I think the problem lies with the fact that I tend to prefer factories and module pattern fn's, which can look and feel like a fn most of the time. But then when I'm working with an output object or using mixins, I forget that the this keyword is then required. I'm optimistic and think this will get better with more practice
