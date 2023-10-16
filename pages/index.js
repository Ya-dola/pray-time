import PushNotifLayout from "@/components/PushNotifLayout";
import { showNotification } from "@/utils/notifications";
import TimerNotif from "@/components/TimerNotif";

const Home = () => {
  return (
    <div>
      <PushNotifLayout title="Pray Notif Time" message="Test Body Message">
        {(showToast) => (
          <>
            <button onClick={() => showToast()}>Trigger Toast</button>
          </>
        )}
      </PushNotifLayout>
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
      <TimerNotif
        title={"Timer Notification"}
        message={"Timer Test Message In TIME"}
        hours={18}
        minutes={17}
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
