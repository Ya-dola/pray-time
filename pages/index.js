import PushNotifLayout from "@/components/PushNotifLayout";

const Home = () => {
  return (
    <PushNotifLayout
      title="Pray Time"
      message="Notification Message is Working"
    >
      {(showNotificationAndToast) => (
        <div>
          <button onClick={showNotificationAndToast}>
            Trigger Push Notification and Toast
          </button>
          <div>Hello</div>
        </div>
      )}
    </PushNotifLayout>
  );
};

export default Home;
