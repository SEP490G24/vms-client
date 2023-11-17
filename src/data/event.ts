export const EVENTS = [
  {
    event_id: 1,
    title: 'Event 1',
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    admin_id: [1, 2, 3, 4]
  },
  {
    event_id: 2,
    title: 'Event 2',
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 2,
    color: '#50b500',
    id: 'abc'
  },
  {
    event_id: 3,
    title: 'Event 3',
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 1,
    editable: false,
    deletable: false
  },
  {
    event_id: 4,
    title: 'Event 4',
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    color: '#900000'
  },
  {
    event_id: 5,
    title: 'Event 5',
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    editable: true
  },
  {
    event_id: 6,
    title: 'Event 6',
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 4
      )
    ),
    end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
    admin_id: 2
  }
]


export const ROOM_EVENTS = [
  {
    'id': '4740786e-0579-4693-afd7-b2ee09f1f06d',
    'code': 'I1211235711502988983295950',
    'name': 'Time Based Policy',
    'roomName': 'Phòng Tiếp Khách',
    'purpose': 'INTERVIEW',
    'startTime': '2023-11-13 11:00:00',
    'endTime': '2023-11-13 12:00:00',
    'status': 'PENDING',
    'username': 'vms_hn_longnv',
    'roomId': '93a9e0d4-7ce5-4057-8843-7c2a612635bb',
    'createdBy': 'vms_hn_longnv',
    'createdOn': '2023-11-12 12:03:50',
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    'customers': [
      {
        'id': 'fc3b05e4-a563-432c-8ac4-2b69a691f2fe',
        'visitorName': 'Quanla',
        'identificationNumber': '0',
        'email': 'quanla.work@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'MALE',
        'description': 'string'
      },
      {
        'id': '07d3e756-64b2-4a9a-8d42-0b795e45112d',
        'visitorName': 'tryhn',
        'identificationNumber': '1',
        'email': 'trinhnx151@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'FEMALE',
        'description': 'string'
      }
    ]
  },
  {
    'id': '4b04a38c-cfdc-4290-8909-3419b1b1eca9',
    'code': 'C1111236146693700436750492',
    'name': 'Họp đồ án',
    'roomName': 'Phòng tiếp khách 2',
    'purpose': 'CONFERENCES',
    'startTime': '2023-11-12 22:51:57',
    'endTime': '2023-11-12 23:50:57',
    'status': 'CANCEL',
    'username': 'vms_hn_longnv',
    'roomId': '9bcc4792-b611-4f19-943b-2357cada58cd',
    'createdBy': 'vms_hn_longnv',
    'createdOn': '2023-11-11 23:12:33',
    'lastUpdatedBy': 'vms_hn_longnv',
    'lastUpdatedOn': '2023-11-12 13:51:06',
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    'customers': [
      {
        'id': '07d3e756-64b2-4a9a-8d42-0b795e45112d',
        'visitorName': 'tryhn',
        'identificationNumber': '1',
        'email': 'trinhnx151@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'FEMALE',
        'description': 'string'
      }
    ]
  },
  {
    'id': '2a8b3e3f-687b-4e0e-bf8a-a22a5195ef1e',
    'code': 'C1111236146693700436750492',
    'name': 'Họp đồ án',
    'roomName': 'Phòng tiếp khách 2',
    'purpose': 'CONFERENCES',
    'startTime': '2023-12-31 22:51:57',
    'endTime': '2023-12-31 23:50:57',
    'status': 'CANCEL',
    'username': 'vms_hn_longnv',
    'roomId': '9bcc4792-b611-4f19-943b-2357cada58cd',
    'createdBy': 'vms_hn_longnv',
    'createdOn': '2023-11-11 22:53:45',
    'lastUpdatedBy': 'vms_hn_longnv',
    'lastUpdatedOn': '2023-11-12 13:52:14',
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    'customers': [
      {
        'id': 'c353835a-5e1e-4df5-973f-aec252bf260f',
        'visitorName': 'Quanla',
        'identificationNumber': '0',
        'email': 'quanla.work@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'MALE',
        'description': 'string'
      }
    ]
  },
  {
    'id': 'cdd812b0-66f6-47fe-b9cd-b89c5682c160',
    'code': 'C1211234111834374786257702',
    'name': 'Họp đồ án',
    'roomName': 'Meeting room 1',
    'purpose': 'CONFERENCES',
    'startTime': '2023-11-12 16:51:57',
    'endTime': '2023-11-12 17:50:57',
    'status': 'PENDING',
    'username': 'vms_hn_quanla112',
    'roomId': '5d57b990-af05-4159-9320-fda5638e3e88',
    'createdBy': 'vms_hn_quanla112',
    'createdOn': '2023-11-12 14:57:11',
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    'customers': [
      {
        'id': 'c353835a-5e1e-4df5-973f-aec252bf260f',
        'visitorName': 'Quanla',
        'identificationNumber': '0',
        'email': 'quanla.work@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'MALE',
        'description': 'string'
      }
    ]
  },
  {
    'id': '0ecedd4c-4876-4f09-b9ac-0629c0f0cd56',
    'code': 'I1311235248622897030983435',
    'name': 'Nghiêm Xuân Trình',
    'roomName': 'Phòng tiếp khách 2',
    'purpose': 'INTERVIEW',
    'startTime': '2023-11-14 11:00:00',
    'endTime': '2023-11-14 12:00:00',
    'status': 'CANCEL',
    'username': 'vms_hn_longnv',
    'roomId': '9bcc4792-b611-4f19-943b-2357cada58cd',
    'createdBy': 'vms_hn_longnv',
    'createdOn': '2023-11-13 12:50:49',
    'lastUpdatedBy': 'vms_hn_longnv',
    'lastUpdatedOn': '2023-11-13 13:00:09',
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    'customers': [
      {
        'id': '07d3e756-64b2-4a9a-8d42-0b795e45112d',
        'visitorName': 'tryhn',
        'identificationNumber': '1',
        'email': 'trinhnx151@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'FEMALE',
        'description': 'string'
      }
    ]
  },
  {
    'id': '4f66dbaf-cd04-49ae-be5f-3be2f332e3f5',
    'code': 'I1311235248622897030983435',
    'name': 'Phỏng Vấn Java',
    'roomName': 'Phòng tiếp khách 2',
    'purpose': 'INTERVIEW',
    'startTime': '2023-11-14 12:00:00',
    'endTime': '2023-11-14 20:56:33',
    'status': 'CANCEL',
    'username': 'vms_hn_longnv',
    'roomId': '9bcc4792-b611-4f19-943b-2357cada58cd',
    'createdBy': 'vms_hn_longnv',
    'createdOn': '2023-11-13 13:56:43',
    'lastUpdatedBy': 'vms_hn_longnv',
    'lastUpdatedOn': '2023-11-13 14:01:38',
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    'customers': [
      {
        'id': '07d3e756-64b2-4a9a-8d42-0b795e45112d',
        'visitorName': 'tryhn',
        'identificationNumber': '1',
        'email': 'trinhnx151@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'FEMALE',
        'description': 'string'
      }
    ]
  },
  {
    'id': '9f902fad-8336-4c30-89b6-e055af933c36',
    'code': 'C1411232029680766472714230',
    'name': 'Họp đồ án',
    'roomName': 'Phòng tiếp khách 2',
    'purpose': 'CONFERENCES',
    'startTime': '2023-11-12 16:51:57',
    'endTime': '2023-11-12 17:50:57',
    'status': 'PENDING',
    'username': 'vms_hn_longnv',
    'roomId': '9bcc4792-b611-4f19-943b-2357cada58cd',
    'createdBy': 'vms_hn_longnv',
    'createdOn': '2023-11-14 16:53:08',
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    'customers': [
      {
        'id': 'c353835a-5e1e-4df5-973f-aec252bf260f',
        'visitorName': 'Quanla',
        'identificationNumber': '0',
        'email': 'quanla.work@gmail.com',
        'organizationId': '9b679ece-69ed-4098-a32c-5a7cd024b27a',
        'phoneNumber': '0388149446',
        'gender': 'MALE',
        'description': 'string'
      }
    ]
  }
]


export const RESOURCES = [
  {
    'createdBy': 'vms_admin',
    'createdOn': '2023-10-24 17:37:51',
    'lastUpdatedBy': 'admin',
    'lastUpdatedOn': '2023-10-26 00:09:44',
    'roomId': '93a9e0d4-7ce5-4057-8843-7c2a612635bb',
    'id': '93a9e0d4-7ce5-4057-8843-7c2a612635bb',
    'name': 'Phòng Tiếp Khách',
    'code': 'PTK',
    'description': 'Phòng này để tiếp khách ',
    'enable': true,
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    color: '#ab2d2d'
  },
  {
    'createdBy': 'vms_admin',
    'createdOn': '2023-10-25 23:59:54',
    'lastUpdatedBy': 'vms_admin',
    'lastUpdatedOn': '2023-11-11 13:45:33',
    'roomId': '5d57b990-af05-4159-9320-fda5638e3e88',
    'id': '5d57b990-af05-4159-9320-fda5638e3e88',
    'name': 'Meeting room 1',
    'code': 'PTQ',
    'description': 'Room for meeting',
    'enable': true,
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    color: '#58ab2d'
  },
  {
    'createdBy': 'vms_admin',
    'createdOn': '2023-11-11 13:01:00',
    'lastUpdatedBy': 'vms_admin',
    'lastUpdatedOn': '2023-11-16 22:25:23',
    'roomId': '9bcc4792-b611-4f19-943b-2357cada58cd',
    'id': '9bcc4792-b611-4f19-943b-2357cada58cd',
    'name': 'Phòng tiếp khách 2',
    'code': 'PTK2',
    'description': 'tecs',
    'enable': true,
    'siteId': '3d65906a-c6e3-4e9d-bbc6-ba20938f9cad',
    color: '#a001a2'
  }
]
