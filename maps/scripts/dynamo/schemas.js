const mapsSchema = {
  TableName: "Maps",

  KeySchema: [
    {
      AttributeName: "mapID",
      KeyType: "HASH"
    }
  ],

  AttributeDefinitions: [
    {
      AttributeName: "mapID",
      AttributeType: "N"
    }
  ],

  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

const nodesSchema = {
  TableName: "Nodes",

  KeySchema: [
    {
      AttributeName: "nodeID",
      KeyType: "HASH"
    }
  ],

  GlobalSecondaryIndexes: [
    {
      IndexName: "MapIndex",

      KeySchema: [
        {
          AttributeName: "mapID",
          KeyType: "HASH"
        }
      ],

      Projection: { ProjectionType: "ALL" },

      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
      }
    }
  ],

  AttributeDefinitions: [
    {
      AttributeName: "nodeID",
      AttributeType: "N"
    },
    {
      AttributeName: "mapID",
      AttributeType: "N"
    }
  ],

  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

const resourcesSchema = {
  TableName: "Resources",

  KeySchema: [
    {
      AttributeName: "resourceID",
      KeyType: "HASH",
    },
  ],

  GlobalSecondaryIndexes: [
    {
      IndexName: "MapIndex",

      KeySchema: [
        {
          AttributeName: "mapID",
          KeyType: "HASH"
        }
      ],

      Projection: { ProjectionType: "ALL" },

      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
      }
    }
  ],

  AttributeDefinitions: [
    {
      AttributeName: "resourceID",
      AttributeType: "S",
    },
    {
      AttributeName: "mapID",
      AttributeType: "N"
    }
  ],

  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

const votesSchema = {
  TableName: "Votes",

  KeySchema: [
    {
      AttributeName: "userID",
      KeyType: "HASH"
    },
    {
      AttributeName: "resourceID",
      KeyType: "RANGE"
    },
  ],

  GlobalSecondaryIndexes: [
    {
      IndexName: "MapIndex",

      KeySchema: [
        {
          AttributeName: "userID",
          KeyType: "HASH"
        },
        {
          AttributeName: "mapID",
          KeyType: "RANGE"
        },
      ],

      Projection: { ProjectionType: "ALL" },

      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
      }
    }
  ],

  AttributeDefinitions: [
    {
      AttributeName: "userID",
      AttributeType: "S"
    },
    {
      AttributeName: "resourceID",
      AttributeType: "S"
    },
    {
      AttributeName: "mapID",
      AttributeType: "N"
    }
  ],

  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};


module.exports = {
  Maps: mapsSchema,
  Nodes: nodesSchema,
  Resources: resourcesSchema,
  Votes: votesSchema,
};
