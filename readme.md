## CSV Notifier

---
### TLDR
This document is a discussion of the design decisions reached during docussions on Thursday. It identifies two key models (**charting element** and **notification**), and offers simplified defintions of those models, and some discussion of dependencies involved.

Code in this repo includes the generation of a POC what I judge to be the most interesting structure in play for this solution, the **list of notification elements**, and associated tests.

Running `npm install`, and then `npm test`, will execute those tests (assuming node is properly set up).

---
### Discussion

The initial spec was for a system that accepts the  import of a CSV document containing medical charting information. Upon completion of the import, the system should send notification to the provider associated with the patient(s) associated with the charting data.

This scope crept slightly as discussions proceeded, leveraging the opportunity to offer important usability enhancements for the provider (whom I would consider to be the target consumer of this functionality). This shift will be discussed below.

To my thinking, there are two key models in play for this solution.

1. The notification itself.
2. The charting data.

### Notification Element

---
The notification is ultimately consumed and passed to a SMS service (and/or native application notifications). Given this medium, and the target audience (care providers), it is import to surface the most critical data quickly.

This leads us to the key enhancement - offering a prioritized set, based on evaluating the chart results against normal ranges for the associated tests, and flagging results deviating from those norms (ideally with some level of severity of the deviation).

This enables providers to focus on areas where their attention is most needed, while retaining awareness of the needs of all patients in their caseload.

A notification, at the service level, is simply an object. It comprises the data required to generate a text notification, similar to:

_Test Results Available_
* _(patient id): 12 results, 2 critical_
* _(2nd patient id): 13 results, 3 minor_
* _(3rd patient id): 17 results_
* _Etc._

Of course, these would also be ideally linked to a view on a native application where the specifics could be explored, with patients sorted by the same criteria.

### Charting Data

---
This data should probably be stored as *individual result elements*. The only strict requirement is that a service definition is able to return a list of charting data elements, based on queries by date range and by provider. A well factored service should hide the internals of that call.
