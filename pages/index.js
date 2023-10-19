import PushToastLayout from "@/components/PushToastLayout";
import TimerNotif from "@/components/TimerNotif";
import { showNotification } from "@/utils/notifications";
import { getData, PRAYER_TIMINGS } from "@/utils/adhanApi";

const Home = () => {
  return (
    <div>
      <PushToastLayout title="Pray Toast Time" message="Test Body Message">
        {(showToast) => (
          <>
            <button onClick={() => showToast()}>Trigger Toast</button>
          </>
        )}
      </PushToastLayout>
      <div>Hello</div>
      <button
        onClick={() =>
          showNotification(
            "Pray Notif Time",
            "Are you sure you want to miss your prayer??",
          )
        }
      >
        Trigger Notification
      </button>
      <div>
        <button
          onClick={() =>
            console.log("Button", getData().timings[PRAYER_TIMINGS.DHUHR])
          }
        >
          Show Adhan
        </button>
      </div>
      <TimerNotif
        title={"Timer Notification"}
        message={"Timer Test Message In TIME"}
        hours={12}
        minutes={53}
      />
      <TimerNotif
        title={"Timer Notification 2"}
        message={"Timer Test Message without facts"}
        hours={18}
        minutes={18}
      />
    </div>
  );
};

export default Home;
