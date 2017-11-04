# Sherlock

 Deduces the user attentiveness on the video playback. Provides the distraction event counts and its type. It will detect browser focus, mouse click, scroll and touch events. These distractions are mapped into the playback time stamp seconds.
 Feeds will be sent to feeds API only when the player in playing state. All the distraction events are captured using the Bacon JS lib. Mozilla page visibility API is used to stop playback when the user switches tabs. The player will resume playing state when the user comes back to player browser tab.
## Getting Started

npm install

npm run start

#### http://localhost:3000/
open http://localhost:3000/ in browser. It will load the page which contains some ooyala player and text contents.
#### http://localhost:3000/report
open http://localhost:3000/report in browser. It provides the user attentiveness and distraction details.

### API - Endpoints

GET  - http://localhost:3000/feeds

    Returns the distractions count and timestamp in seconds. This will be used to generate the reports.

POST - http://localhost:3000/feeds

    index.html will push the captured distraction events to the server. The server will store that info. Ideally in future store that into DB or push it to the other system.
    As of now, we are not getting distraction event type. The same can be added later

    Body:

        {
            "count": distraction_event_count
            "second": playback_second
        }

    Example :

        {
            "count": distraction_event_count
            "second": playback_event_second
        }

POST - http://localhost:3000/feeds/reset

    This to reset the report. More of a temporary solution. It won't require when we get the feeds with browser session id and user id.
    Added mainly for demo purpose.