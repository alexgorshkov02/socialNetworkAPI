const { Schema, Types, model } = require("mongoose");
const { format } = require("date-fns");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, "Please provide a reaction"],
      maxlength: 280,
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => format(createdAtVal, "MM/dd/yyyy"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please provide a thought",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => format(createdAtVal, "MM/dd/yyyy"),
    },
    username: {
      type: String,
      required: "Please provide a username",
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of reactions in the array
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
