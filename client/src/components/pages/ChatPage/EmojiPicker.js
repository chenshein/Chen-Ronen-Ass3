import "./style/components.css";
import { useState } from "react";

const emojiMap = {
  "😀": "grinning",
  "😃": "smiley",
  "😄": "smile",
  "😁": "grin",
  "😆": "laughing",
  "😅": "sweat_smile",
  "🤣": "rofl",
  "😂": "joy",
  "🙂": "slightly_smiling_face",
  "🙃": "upside_down_face",
  "😉": "wink",
  "😊": "blush",
  "😇": "innocent",
  "🥰": "smiling_face_with_three_hearts",
  "😍": "heart_eyes",
  "🤩": "star_struck",
  "😘": "kissing_heart",
  "😗": "kissing",
  "😚": "kissing_closed_eyes",
  "😙": "kissing_smiling_eyes",
  "😋": "yum",
  "😛": "stuck_out_tongue",
  "😜": "stuck_out_tongue_winking_eye",
  "🤪": "zany_face",
  "😝": "stuck_out_tongue_closed_eyes",
  "🤑": "money_mouth_face",
  "🤗": "hugs",
  "🤭": "hand_over_mouth",
  "🤫": "shushing_face",
  "🤔": "thinking_face",
  "🤐": "zipper_mouth_face",
  "🤨": "face_with_raised_eyebrow",
  "😐": "neutral_face",
  "😑": "expressionless",
  "😶": "no_mouth",
  "😏": "smirk",
  "😒": "unamused",
  "🙄": "roll_eyes",
  "😬": "grimacing",
  "🤥": "lying_face",
  "😌": "relieved",
  "😔": "pensive",
  "😪": "sleepy",
  "🤤": "drooling_face",
  "😴": "sleeping",
  "😷": "mask",
  "🤒": "face_with_thermometer",
  "🤕": "face_with_head_bandage",
  "🤢": "nauseated_face",
  "🤮": "vomiting_face",
  "🤧": "sneezing_face",
  "🥵": "hot_face",
  "🥶": "cold_face",
  "🥴": "woozy_face",
  "😵": "dizzy_face",
  "🤯": "exploding_head",
  "🤠": "cowboy_hat_face",
  "🥳": "partying_face",
  "😎": "sunglasses",
  "🤓": "nerd_face",
  "🧐": "monocle_face",
  "😕": "confused",
  "😟": "worried",
  "🙁": "slightly_frowning_face",
  "☹️": "frowning_face",
  "😮": "open_mouth",
  "😯": "hushed",
  "😲": "astonished",
  "😳": "flushed",
  "🥺": "pleading_face",
  "😦": "frowning",
  "😧": "anguished",
  "😨": "fearful",
  "😰": "cold_sweat",
  "😥": "disappointed_relieved",
  "😢": "cry",
  "😭": "sob",
  "😱": "scream",
  "😖": "confounded",
  "😣": "persevere",
  "😞": "disappointed",
  "😓": "sweat",
  "😩": "weary",
  "😫": "tired_face",
  "🥱": "yawning_face",
  "😤": "triumph",
  "😡": "rage",
  "😠": "angry",
  "🤬": "cursing_face",
  "😈": "smiling_imp",
  "👿": "imp",
  "💀": "skull",
  "☠️": "skull_and_crossbones",
  "💩": "hankey",
  "🤡": "clown_face",
  "👹": "japanese_ogre",
  "👺": "japanese_goblin",
  "👻": "ghost",
  "👽": "alien",
  "👾": "space_invader",
  "🤖": "robot",
  "😺": "smiley_cat",
  "😸": "smile_cat",
  "😹": "joy_cat",
  "😻": "heart_eyes_cat",
  "😼": "smirk_cat",
  "😽": "kissing_cat",
  "🙀": "scream_cat",
  "👋": "wave",
  "🤚": "raised_back_of_hand",
  "🖐️": "hand_splayed",
  "✋": "raised_hand",
  "🖖": "vulcan_salute",
  "👌": "ok_hand",
  "🤏": "pinching_hand",
  "✌️": "v",
  "🤞": "crossed_fingers",
  "🤟": "love_you_gesture",
  "🤘": "metal",
  "🤙": "call_me_hand",
  "👈": "point_left",
  "👉": "point_right",
  "👆": "point_up_2",
  "🖕": "fu",
  "👇": "point_down",
  "☝️": "point_up",
  "👍": "+1",
  "👎": "-1",
  "✊": "fist_raised",
  "👊": "fist_oncoming",
  "🤛": "fist_left",
  "🤜": "fist_right",
  "👏": "clap",
  "🙌": "raised_hands",
  "👐": "open_hands",
  "🤲": "palms_up_together",
  "🤝": "handshake",
  "🙏": "pray",
  "✍️": "writing_hand",
  "💅": "nail_care",
  "🤳": "selfie",
  "💪": "muscle",
  "🦾": "mechanical_arm",
  "🦿": "mechanical_leg",
  "🦵": "leg",
  "🦶": "foot",
  "👂": "ear",
  "🦻": "ear_with_hearing_aid",
  "👃": "nose",
  "🧠": "brain",
  "🦷": "tooth",
  "🦴": "bone",
  "👀": "eyes",
  "👁️": "eye",
  "👅": "tongue",
  "👄": "lips",
  "👶": "baby",
  "🧒": "child",
};

function EmojiPicker({ addEmoji }) {
  const [displayEmojis, setDisplayEmojis] = useState(Object.keys(emojiMap));

  const handleEmojiSearch = (e) => {
    const searchValue = e.target.value;
    const filteredEmojis = Object.keys(emojiMap).filter((emoji) =>
      emojiMap[emoji].includes(searchValue)
    );
    setDisplayEmojis(filteredEmojis);
  };

  return (
    <div className="active_emojiBar">
      <>
        {displayEmojis.map((emoji) => (
          <span
            key={emoji}
            className="emoji-picker__emoji"
            onClick={() => addEmoji(emoji)}
          >
            {emoji}
          </span>
        ))}
      </>
      <input
        type="text"
        className="emoji-picker__search"
        placeholder="Search"
        onChange={handleEmojiSearch}
      />
    </div>
  );
}

export default EmojiPicker;
