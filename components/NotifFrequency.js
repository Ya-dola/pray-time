import { Select } from "@radix-ui/themes";
import { getNotifFreq, setNotifFreq } from "@/utils/cookieUtils";
import { NOTIF_FREQS } from "@/utils/timeUtils";

const NotifFrequency = () => {
  return (
    <Select.Root
      size={"3"}
      defaultValue={getNotifFreq}
      onValueChange={setNotifFreq}
    >
      <Select.Trigger />
      <Select.Content position={"popper"}>
        <Select.Item value={NOTIF_FREQS.ONE}>One Time</Select.Item>
        <Select.Item value={NOTIF_FREQS.THREE}>Three Times</Select.Item>
        <Select.Item value={NOTIF_FREQS.FIVE}>Five Times</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default NotifFrequency;
