# Insurlytics

Insurance request prioritization for Underwriters

Concept:

Underwriters are well-familiar with parsing through CSV's and attempting to extract the most promising submissions - but often times there is large variance and opportunities. Insurlytics analyzes collections of submissions to determine and float the most promosing submissions to the top of the underwriter's attention list.

### How to run
From the home directory of the project.
<pre>
    yarn
    yarn start
</pre>


### TODO
* Use regular table for list of submissions and their ranking - both the brokers list and the submissions list. :check
* Pre-approval indication or option in the UI for the highest profitable quote opportunities. :check
* Be able to click a row in the table and have a modal pop up that gives more information on the request - including the ability to specify a quote value to be communicated back to the broker (submittable as a dollar amount). Decline is also an option, and you can kill it from the list. :check
* Check box column to be able approve a particular quote submission. :check
* Color code the rows for the brokers table as well. :check

### Components
* Be able to identify the brokers that excel at generating profitability for requests, as well as those that don't
* Float the most promising reports to the top

### Dev Notes
* https://github.com/jerairrest/react-chartjs-2