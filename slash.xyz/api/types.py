
import datetime as dt
import pytz
from api.utils import *
import json
import binascii
import struct
import six
import colander

from colander import Invalid
from collections import OrderedDict

from api.utils import *
from api.types import *
from api.keys import *


class BaseSchema(colander.SchemaNode):
    required = True


class StringSchema(BaseSchema):
    schema_type = colander.String

# str schemas


class NameSchema(StringSchema):
    pass


class AccountNameSchema(NameSchema):
    pass


class PermissionNameSchema(NameSchema):
    pass


class ActionNameSchema(NameSchema):
    pass


class TableNameSchema(NameSchema):
    pass


class ScopeNameSchema(NameSchema):
    pass

# boolean


class BooleanSchema(BaseSchema):
    schema_type = colander.Bool

# numeric


class IntSchema(BaseSchema):
    schema_type = colander.Int


class HexBytesSchema(StringSchema):
    missing = colander.drop

# Authority/permission


class ThresholdSchema(IntSchema):
    pass


class PublicKeySchema(StringSchema):
    pass


class WeightSchema(IntSchema):
    pass


class KeyWeightSchema(colander.MappingSchema):
    key = PublicKeySchema()
    weight = WeightSchema()


class KeyWeightsSchema(colander.SequenceSchema):
    key = KeyWeightSchema()


class PermissionLevelSchema(colander.MappingSchema):
    actor = AccountNameSchema()
    permission = PermissionNameSchema()


class PermissionLevelsSchema(colander.SequenceSchema):
    permission = PermissionLevelSchema()


class PermissionLevelWeightSchema(colander.MappingSchema):
    permission = PermissionLevelSchema()
    weight = WeightSchema()


class PermissionLevelWeightsSchema(colander.SequenceSchema):
    permission_level = PermissionLevelWeightSchema()


class WaitSecSchema(IntSchema):
    pass


class WaitWeightSchema(colander.MappingSchema):
    wait_sec = WaitSecSchema()
    weight = WeightSchema()


class WaitWeightsSchema(colander.SequenceSchema):
    waits = WaitWeightSchema()


class AuthoritySchema(colander.MappingSchema):
    threshold = ThresholdSchema()
    keys = KeyWeightsSchema()
    accounts = PermissionLevelWeightsSchema()
    waits = WaitWeightsSchema()


class PermNameSchema(BaseSchema):
    schema_type = colander.String


class ParentSchema(StringSchema):
    pass


class PermissionSchema(colander.MappingSchema):
    perm_name = PermNameSchema()
    parent = ParentSchema()
    required_auth = AuthoritySchema()

# def validate_data_schema(node, value):
#     if not isinstance(value, dict) or not isinstance(value, str):
#         raise colander.Invalid(node, '{} is not a valid data schema'.format(value))


class DataSchema(colander.SchemaType):

    def serialize(self, node, appstruct):
        if appstruct is colander.null:
            return colander.null
        impl = colander.Mapping()
        if isinstance(appstruct, str):
            impl = StringSchema()
        return impl.serialize(node, appstruct)

    def deserialize(self, node, cstruct):
        return cstruct

#############################
# message actions attributes
#############################


class ActionSchema(colander.MappingSchema):
    account = AccountNameSchema()
    name = ActionNameSchema()
    authorization = PermissionLevelsSchema()
    # if data is there it can be a HexBytesSchema or DataSchema
    hex_data = HexBytesSchema()
    data = colander.SchemaNode(DataSchema())


class ActionsSchema(colander.SequenceSchema):
    action = ActionSchema()


class ContextActionsSchema(colander.SequenceSchema):
    default = []
    missing = []
    action = ActionSchema()


class ExtensionSchema(colander.MappingSchema):
    type = IntSchema()
    data = HexBytesSchema()


class ExtensionsSchema(colander.SequenceSchema):
    default = []
    missing = []
    extension = ExtensionSchema()

#############################
# message header attributes
#############################


class TimeSchema(BaseSchema):
    schema_type = colander.DateTime


class RefBlockNumSchema(IntSchema):
    pass


class RefBlockPrefixSchema(IntSchema):
    pass


class NetUsageWordsSchema(IntSchema):
    default = 0
    missing = 0


class MaxCpuUsageMsSchema(IntSchema):
    default = 0
    missing = 0


class DelaySecSchema(IntSchema):
    default = 0
    missing = 0


class SignaturesSchema(colander.Sequence):
    signatures = StringSchema()


class TransactionSchema(colander.MappingSchema):
    # header
    expiration = TimeSchema()
    ref_block_num = RefBlockNumSchema()
    ref_block_prefix = RefBlockPrefixSchema()
    net_usage_words = NetUsageWordsSchema()
    max_cpu_usage_ms = MaxCpuUsageMsSchema()
    delay_sec = DelaySecSchema()
    # body
    context_free_actions = ContextActionsSchema()
    actions = ActionsSchema()
    transaction_extensions = ExtensionsSchema()

# signed transaction


class SignedTransactionSchema(colander.MappingSchema):
    compression = StringSchema
    transaction = TransactionSchema()
    signatures = SignaturesSchema()

# final transaction


class PushTransactionSchema(colander.MappingSchema):
    transaction_id = StringSchema()
    broadcast = BooleanSchema()
    transaction = SignedTransactionSchema()


class TransactionsSchema(colander.SequenceSchema):
    transactions = TransactionSchema()

#############################
# get info
#############################


class ChainInfoSchema(colander.MappingSchema):
    server_version = StringSchema()
    chain_id = StringSchema()
    head_block_num = IntSchema()
    last_irreversible_block_num = IntSchema()
    last_irreversible_block_id = StringSchema()
    head_block_id = StringSchema()
    head_block_time = TimeSchema()
    head_block_producer = StringSchema()
    virtual_block_cpu_limit = IntSchema()
    virtual_block_net_limit = IntSchema()
    block_cpu_limit = IntSchema()
    block_net_limit = IntSchema()

#############################
# get block
#############################


class ProducerSchema(colander.SchemaNode):
    schema_type = colander.String
    missing = 'null'
    default = 'null'
    required = False


class HeaderExtsSchema(colander.SequenceSchema):
    header_extensions = ExtensionsSchema()


class BlockExtsSchema(colander.SequenceSchema):
    block_extensions = ExtensionsSchema()


class BlockInfoSchema(colander.MappingSchema):
    timestamp = TimeSchema()
    producer = StringSchema()
    confirmed = IntSchema()
    previous = StringSchema()
    transaction_mroot = StringSchema()
    action_mroot = StringSchema()
    schedule_version = IntSchema
    new_producers = ProducerSchema()
    header_extensions = HeaderExtsSchema()
    producer_signature = StringSchema
    # TODO
    #transactions = [],
    block_extensions = BlockExtsSchema()
    id = StringSchema()
    block_num = IntSchema()
    ref_block_prefix = IntSchema()

#############################
# abi
#############################


class AbiTypeSchema(colander.MappingSchema):
    new_type_name = StringSchema()
    type = StringSchema()


class AbiTypesSchema(colander.SequenceSchema):
    default = []
    missing = []
    types = AbiTypeSchema()


class AbiStructFieldSchema(colander.MappingSchema):
    name = StringSchema()
    type = StringSchema()


class AbiStructFieldsSchema(colander.SequenceSchema):
    default = []
    missing = []
    fields = AbiStructFieldSchema()


class AbiStructBaseSchema(StringSchema):
    default = ""
    missing = ""


class AbiStructSchema(colander.MappingSchema):
    name = StringSchema()
    base = AbiStructBaseSchema()
    fields = AbiStructFieldsSchema()


class AbiStructsSchema(colander.SequenceSchema):
    structs = AbiStructSchema()


class AbiRicardianStrSchema(StringSchema):
    default = ""
    missing = ""
    required = False


class AbiActionSchema(colander.MappingSchema):
    name = StringSchema()
    type = StringSchema()
    ricardian_contract = AbiRicardianStrSchema()


class AbiActionsSchema(colander.SequenceSchema):
    actions = AbiActionSchema()


class AbiTableKey(StringSchema):
    pass
    # required = False


class AbiTablesKey(colander.SequenceSchema):
    default = []
    missing = []
    keys = AbiTableKey()


class AbiTableSchema(colander.MappingSchema):
    name = StringSchema()
    index_type = StringSchema()
    key_names = AbiTablesKey()
    key_types = AbiTablesKey()
    type = StringSchema()


class AbiTablesSchema(colander.SequenceSchema):
    missing = []
    default = []
    tables = AbiTableSchema()


class AbiRicardianClauseSchema(colander.MappingSchema):
    id = StringSchema()
    body = StringSchema()


class AbiRicardianClausesSchema(colander.SequenceSchema):
    required = False
    missing = []
    default = []
    rcs = AbiRicardianClauseSchema()

# placeholder


class AbiErrorMessageSchema(StringSchema):
    required = False


class AbiErrorMessagesSchema(colander.SequenceSchema):
    default = []
    missing = []
    required = False
    error_messages = AbiErrorMessageSchema()

# placeholder


class AbiExtensionSchema(StringSchema):
    required = False


class AbiExtensionsSchema(colander.SequenceSchema):
    default = []
    missing = []
    required = False
    abi_extensions = AbiExtensionSchema()

# placeholder


class AbiVariantSchema(StringSchema):
    required = False


class AbiVariantsSchema(colander.SequenceSchema):
    default = []
    missing = []
    required = False
    variants = AbiVariantSchema()


class AbiCommentSchema(StringSchema):
    required = False
    default = ""
    missing = ""


class AbiSchema(colander.MappingSchema):
    version = StringSchema()
    types = AbiTypesSchema()
    structs = AbiStructsSchema()
    actions = AbiActionsSchema()
    tables = AbiTablesSchema()
    ricardian_clauses = AbiRicardianClausesSchema()
    error_messages = AbiErrorMessagesSchema()
    abi_extensions = AbiExtensionsSchema()
    variants = AbiVariantsSchema()

#############################
# ineryytest
#############################


def test_param_validator(node, value):
    if not isinstance(value, dict):
        raise colander.Invalid(node, '{} is not a valid dictionary'.format(value))


class TestEnvSchema(colander.MappingSchema):
    url = StringSchema()


class TestAuthSchema(colander.MappingSchema):
    required = False
    default = {}
    missing = {}
    actor = StringSchema()
    permission = StringSchema()
    key = StringSchema()


class TestResultsSchema(colander.SequenceSchema):
    results = StringSchema()


class TestQuerySchema(colander.MappingSchema):
    query = StringSchema()
    parameters = colander.SchemaNode(
        colander.Mapping(unknown='preserve'),
        validator=test_param_validator
    )
    results = TestResultsSchema()


class TestQueriesSchema(colander.SequenceSchema):
    required = False
    missing = []
    default = []
    queries = TestQuerySchema()


class TestCommentSchema(colander.String):
    required = False
    missing = ""
    default = ""


class TestActionSchema(colander.MappingSchema):
    comment = TestCommentSchema()
    action = StringSchema()
    contract = StringSchema()
    authorization = TestAuthSchema()
    parameters = colander.SchemaNode(
        colander.Mapping(unknown='preserve'),
        validator=test_param_validator
    )
    exception = BooleanSchema()
    queries = TestQueriesSchema()


class TestActionsSchema(colander.SequenceSchema):
    actions = TestActionSchema()


class TestSchema(colander.MappingSchema):
    name = StringSchema()
    authorization = TestAuthSchema()
    actions = TestActionsSchema()


class TestsSchema(colander.SequenceSchema):
    tests = TestSchema()


class TestDocSchema(colander.MappingSchema):
    environment = TestEnvSchema()
    tests = TestsSchema()

class BaseSchema(colander.SchemaNode):
    required = True


class StringSchema(BaseSchema):
    schema_type = colander.String

# str schemas


class NameSchema(StringSchema):
    pass


class AccountNameSchema(NameSchema):
    pass


class PermissionNameSchema(NameSchema):
    pass


class ActionNameSchema(NameSchema):
    pass


class TableNameSchema(NameSchema):
    pass


class ScopeNameSchema(NameSchema):
    pass

# boolean


class BooleanSchema(BaseSchema):
    schema_type = colander.Bool

# numeric


class IntSchema(BaseSchema):
    schema_type = colander.Int


class HexBytesSchema(StringSchema):
    missing = colander.drop

# Authority/permission


class ThresholdSchema(IntSchema):
    pass


class PublicKeySchema(StringSchema):
    pass


class WeightSchema(IntSchema):
    pass


class KeyWeightSchema(colander.MappingSchema):
    key = PublicKeySchema()
    weight = WeightSchema()


class KeyWeightsSchema(colander.SequenceSchema):
    key = KeyWeightSchema()


class PermissionLevelSchema(colander.MappingSchema):
    actor = AccountNameSchema()
    permission = PermissionNameSchema()


class PermissionLevelsSchema(colander.SequenceSchema):
    permission = PermissionLevelSchema()


class PermissionLevelWeightSchema(colander.MappingSchema):
    permission = PermissionLevelSchema()
    weight = WeightSchema()


class PermissionLevelWeightsSchema(colander.SequenceSchema):
    permission_level = PermissionLevelWeightSchema()


class WaitSecSchema(IntSchema):
    pass


class WaitWeightSchema(colander.MappingSchema):
    wait_sec = WaitSecSchema()
    weight = WeightSchema()


class WaitWeightsSchema(colander.SequenceSchema):
    waits = WaitWeightSchema()


class AuthoritySchema(colander.MappingSchema):
    threshold = ThresholdSchema()
    keys = KeyWeightsSchema()
    accounts = PermissionLevelWeightsSchema()
    waits = WaitWeightsSchema()


class PermNameSchema(BaseSchema):
    schema_type = colander.String


class ParentSchema(StringSchema):
    pass


class PermissionSchema(colander.MappingSchema):
    perm_name = PermNameSchema()
    parent = ParentSchema()
    required_auth = AuthoritySchema()

# def validate_data_schema(node, value):
#     if not isinstance(value, dict) or not isinstance(value, str):
#         raise colander.Invalid(node, '{} is not a valid data schema'.format(value))


class DataSchema(colander.SchemaType):

    def serialize(self, node, appstruct):
        if appstruct is colander.null:
            return colander.null
        impl = colander.Mapping()
        if isinstance(appstruct, str):
            impl = StringSchema()
        return impl.serialize(node, appstruct)

    def deserialize(self, node, cstruct):
        return cstruct

#############################
# message actions attributes
#############################


class ActionSchema(colander.MappingSchema):
    account = AccountNameSchema()
    name = ActionNameSchema()
    authorization = PermissionLevelsSchema()
    # if data is there it can be a HexBytesSchema or DataSchema
    hex_data = HexBytesSchema()
    data = colander.SchemaNode(DataSchema())


class ActionsSchema(colander.SequenceSchema):
    action = ActionSchema()


class ContextActionsSchema(colander.SequenceSchema):
    default = []
    missing = []
    action = ActionSchema()


class ExtensionSchema(colander.MappingSchema):
    type = IntSchema()
    data = HexBytesSchema()


class ExtensionsSchema(colander.SequenceSchema):
    default = []
    missing = []
    extension = ExtensionSchema()

#############################
# message header attributes
#############################


class TimeSchema(BaseSchema):
    schema_type = colander.DateTime


class RefBlockNumSchema(IntSchema):
    pass


class RefBlockPrefixSchema(IntSchema):
    pass


class NetUsageWordsSchema(IntSchema):
    default = 0
    missing = 0


class MaxCpuUsageMsSchema(IntSchema):
    default = 0
    missing = 0


class DelaySecSchema(IntSchema):
    default = 0
    missing = 0


class SignaturesSchema(colander.Sequence):
    signatures = StringSchema()


class TransactionSchema(colander.MappingSchema):
    # header
    expiration = TimeSchema()
    ref_block_num = RefBlockNumSchema()
    ref_block_prefix = RefBlockPrefixSchema()
    net_usage_words = NetUsageWordsSchema()
    max_cpu_usage_ms = MaxCpuUsageMsSchema()
    delay_sec = DelaySecSchema()
    # body
    context_free_actions = ContextActionsSchema()
    actions = ActionsSchema()
    transaction_extensions = ExtensionsSchema()

# signed transaction


class SignedTransactionSchema(colander.MappingSchema):
    compression = StringSchema
    transaction = TransactionSchema()
    signatures = SignaturesSchema()

# final transaction


class PushTransactionSchema(colander.MappingSchema):
    transaction_id = StringSchema()
    broadcast = BooleanSchema()
    transaction = SignedTransactionSchema()


class TransactionsSchema(colander.SequenceSchema):
    transactions = TransactionSchema()

#############################
# get info
#############################


class ChainInfoSchema(colander.MappingSchema):
    server_version = StringSchema()
    chain_id = StringSchema()
    head_block_num = IntSchema()
    last_irreversible_block_num = IntSchema()
    last_irreversible_block_id = StringSchema()
    head_block_id = StringSchema()
    head_block_time = TimeSchema()
    head_block_producer = StringSchema()
    virtual_block_cpu_limit = IntSchema()
    virtual_block_net_limit = IntSchema()
    block_cpu_limit = IntSchema()
    block_net_limit = IntSchema()

#############################
# get block
#############################


class ProducerSchema(colander.SchemaNode):
    schema_type = colander.String
    missing = 'null'
    default = 'null'
    required = False


class HeaderExtsSchema(colander.SequenceSchema):
    header_extensions = ExtensionsSchema()


class BlockExtsSchema(colander.SequenceSchema):
    block_extensions = ExtensionsSchema()


class BlockInfoSchema(colander.MappingSchema):
    timestamp = TimeSchema()
    producer = StringSchema()
    confirmed = IntSchema()
    previous = StringSchema()
    transaction_mroot = StringSchema()
    action_mroot = StringSchema()
    schedule_version = IntSchema
    new_producers = ProducerSchema()
    header_extensions = HeaderExtsSchema()
    producer_signature = StringSchema
    # TODO
    #transactions = [],
    block_extensions = BlockExtsSchema()
    id = StringSchema()
    block_num = IntSchema()
    ref_block_prefix = IntSchema()

#############################
# abi
#############################


class AbiTypeSchema(colander.MappingSchema):
    new_type_name = StringSchema()
    type = StringSchema()


class AbiTypesSchema(colander.SequenceSchema):
    default = []
    missing = []
    types = AbiTypeSchema()


class AbiStructFieldSchema(colander.MappingSchema):
    name = StringSchema()
    type = StringSchema()


class AbiStructFieldsSchema(colander.SequenceSchema):
    default = []
    missing = []
    fields = AbiStructFieldSchema()


class AbiStructBaseSchema(StringSchema):
    default = ""
    missing = ""


class AbiStructSchema(colander.MappingSchema):
    name = StringSchema()
    base = AbiStructBaseSchema()
    fields = AbiStructFieldsSchema()


class AbiStructsSchema(colander.SequenceSchema):
    structs = AbiStructSchema()


class AbiRicardianStrSchema(StringSchema):
    default = ""
    missing = ""
    required = False


class AbiActionSchema(colander.MappingSchema):
    name = StringSchema()
    type = StringSchema()
    ricardian_contract = AbiRicardianStrSchema()


class AbiActionsSchema(colander.SequenceSchema):
    actions = AbiActionSchema()


class AbiTableKey(StringSchema):
    pass
    # required = False


class AbiTablesKey(colander.SequenceSchema):
    default = []
    missing = []
    keys = AbiTableKey()


class AbiTableSchema(colander.MappingSchema):
    name = StringSchema()
    index_type = StringSchema()
    key_names = AbiTablesKey()
    key_types = AbiTablesKey()
    type = StringSchema()


class AbiTablesSchema(colander.SequenceSchema):
    missing = []
    default = []
    tables = AbiTableSchema()


class AbiRicardianClauseSchema(colander.MappingSchema):
    id = StringSchema()
    body = StringSchema()


class AbiRicardianClausesSchema(colander.SequenceSchema):
    required = False
    missing = []
    default = []
    rcs = AbiRicardianClauseSchema()

# placeholder


class AbiErrorMessageSchema(StringSchema):
    required = False


class AbiErrorMessagesSchema(colander.SequenceSchema):
    default = []
    missing = []
    required = False
    error_messages = AbiErrorMessageSchema()

# placeholder


class AbiExtensionSchema(StringSchema):
    required = False


class AbiExtensionsSchema(colander.SequenceSchema):
    default = []
    missing = []
    required = False
    abi_extensions = AbiExtensionSchema()

# placeholder


class AbiVariantSchema(StringSchema):
    required = False


class AbiVariantsSchema(colander.SequenceSchema):
    default = []
    missing = []
    required = False
    variants = AbiVariantSchema()


class AbiCommentSchema(StringSchema):
    required = False
    default = ""
    missing = ""


class AbiSchema(colander.MappingSchema):
    version = StringSchema()
    types = AbiTypesSchema()
    structs = AbiStructsSchema()
    actions = AbiActionsSchema()
    tables = AbiTablesSchema()
    ricardian_clauses = AbiRicardianClausesSchema()
    error_messages = AbiErrorMessagesSchema()
    abi_extensions = AbiExtensionsSchema()
    variants = AbiVariantsSchema()

#############################
# ineryytest
#############################


def test_param_validator(node, value):
    if not isinstance(value, dict):
        raise colander.Invalid(node, '{} is not a valid dictionary'.format(value))


class TestEnvSchema(colander.MappingSchema):
    url = StringSchema()


class TestAuthSchema(colander.MappingSchema):
    required = False
    default = {}
    missing = {}
    actor = StringSchema()
    permission = StringSchema()
    key = StringSchema()


class TestResultsSchema(colander.SequenceSchema):
    results = StringSchema()


class TestQuerySchema(colander.MappingSchema):
    query = StringSchema()
    parameters = colander.SchemaNode(
        colander.Mapping(unknown='preserve'),
        validator=test_param_validator
    )
    results = TestResultsSchema()


class TestQueriesSchema(colander.SequenceSchema):
    required = False
    missing = []
    default = []
    queries = TestQuerySchema()


class TestCommentSchema(colander.String):
    required = False
    missing = ""
    default = ""


class TestActionSchema(colander.MappingSchema):
    comment = TestCommentSchema()
    action = StringSchema()
    contract = StringSchema()
    authorization = TestAuthSchema()
    parameters = colander.SchemaNode(
        colander.Mapping(unknown='preserve'),
        validator=test_param_validator
    )
    exception = BooleanSchema()
    queries = TestQueriesSchema()


class TestActionsSchema(colander.SequenceSchema):
    actions = TestActionSchema()


class TestSchema(colander.MappingSchema):
    name = StringSchema()
    authorization = TestAuthSchema()
    actions = TestActionsSchema()


class TestsSchema(colander.SequenceSchema):
    tests = TestSchema()


class TestDocSchema(colander.MappingSchema):
    environment = TestEnvSchema()
    tests = TestsSchema()

def convert_little_endian(buf, format='q'):
    ''' '''
    return struct.pack('<{}'.format(format), buf)


def convert_big_endian(buf, format="I"):
    ''' '''
    # return the first value of the tuple that is returned by unpack
    return struct.unpack('<{}'.format(format), buf)[0]

# json encoder


class INREncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Action):
            return o.__dict__
        if isinstance(o, Authorization):
            return o.__dict__
        if isinstance(o, dt.datetime):
            return o.isoformat()


class Name(str):
    hex_str_len = 16


class AccountName(Name):
    pass


class PermissionName(Name):
    pass


class ActionName(Name):
    pass


class TableName(Name):
    pass


class ScopeName(Name):
    pass


class Byte(int):
    # length of hex str
    hex_str_len = 2


class UInt16(int):
    # length of hex str
    hex_str_len = 4


class UInt32(int):
    # length of hex str
    hex_str_len = 8


class UInt64(int):
    # length of hex str
    hex_str_len = 16


class Int16(int):
    # length of hex str
    hex_str_len = 4


class Int32(int):
    # length of hex str
    hex_str_len = 8


class Int64(int):
    # length of hex str
    hex_str_len = 16


class Float(float):
    # length of hex str
    hex_str_len = 8




class VarUInt:
    def __init__(self, val=""):
        ''' '''
        self._val = val
        self._b_arr = bytearray()

    def _push_byte(self, val):
        self._b_arr.append(int(val))

    def encode(self):
        ''' '''
        # ensure value is an int
        val = int(self._val)
        buf = int((val) & 0x7f)
        val >>= 7
        buf |= (((val > 0) if 1 else 0) << 7)
        self._push_byte(buf)
        while val:
            buf = int((val) & 0x7f)
            val >>= 7
            buf |= (((val > 0) if 1 else 0) << 7)
            self._push_byte(buf)
        return self._b_arr

    def _pop(self, buf, length):
        return buf[:length], buf[length:]

    def decode(self, buf):
        ''' '''
        shift = 0
        result = 0
        while True:
            tmp, buf = self._pop(buf, 2)
            i = hex_to_int(tmp)
            result |= (i & 0x7f) << shift
            shift += 7
            if not(i & 0x80):
                break
        return result, buf


class BaseObject(object):
    def __init__(self, d):
        ''' '''
        try:
            self._obj = self._validator.deserialize(d)
        except Invalid:
            raise INRInvalidSchema('Unable to process schema for {}'.format(type(self)))
        # instantiate the class
        for k, v in self._obj.items():
            setattr(self, k, v)
        # clean up
        del self._obj
        del self._validator

    def __repr__(self):
        ''' '''
        return '{}({})'.format(self.__class__, self.__dict__)

    def _encode_buffer(self, value):
        ''' '''
        return INRBuffer(value).encode()

    def _create_obj_array(self, arr, class_type):
        ''' '''
        new_arr = []
        for item in arr:
            new_arr.append(class_type(item))
        return new_arr


class Action(BaseObject):
    def __init__(self, d):
        ''' '''
        self._validator = ActionSchema()
        super(Action, self).__init__(d)
        # setup permissions
        self.authorization = self._create_obj_array(self.authorization, Authorization)

    def encode(self):
        ''' '''
        acct = self._encode_buffer(AccountName(self.account))
        name = self._encode_buffer(Name(self.name))
        auth = self._encode_buffer(self.authorization)
        # need to figure out how to process data
        # get length
        data_len = self._encode_buffer(VarUInt(len(self.data) / 2))
        data = data_len + self.data
        return '{}{}{}{}'.format(acct, name, auth, data)


class Asset:
    def __init__(self, value, precision=4):
        # self.amount = amt
        # self.symbol = sym
        # self.precision = precision
        self.from_string(value)

    def __str__(self):
        return '{amount:.{precision}f} {symbol}'.format(amount=self.amount, symbol=self.symbol, precision=self.precision)

    def __add__(self, other):
        if self.symbol != other.symbol:
            raise TypeError('Symbols must match: {} != {}', self.symbol, other.symbol)
        return Asset(self.amount + other.amount, self.symbol)

    def __sub__(self, other):
        if self.amount - other.amount < 0:
            raise ValueError('Subtraction would result in a negative.')
        if self.symbol != other.symbol:
            raise TypeError('Symbols must match: {} != {}', self.symbol, other.symbol)
        return Asset(self.amount - other.amount, self.symbol)

    def from_string(self, s):
        splt = s.split()
        try:
            self.amount = float(splt[0])
            self.symbol = splt[1]
            self.precision = len(splt[0].split(".")[1])
        except IndexError:
            raise IndexError('Invalid string format given. Must be in the formst <float> <currency_type>')

    def _string_to_symbol(self):
        ''' '''
        rslt = 0
        cnt = 0
        while cnt < len(self.symbol):
            letter = self.symbol[cnt]
            if letter >= 'A' or letter <= 'Z':
                l = ord(letter)
                rslt |= (UInt64(l) << (8 * (cnt + 1)))
            else:
                raise ValueError("{} contains an invalid symbol. Must be [A-Z].".format(self.symbol))

            cnt += 1
        rslt |= UInt64(self.precision)
        return INRBuffer(UInt64(rslt)).encode()

    def encode(self):
        ''' '''
        power = '1'.ljust(self.precision + len('1'), '0')
        amount = INRBuffer(UInt64(self.amount * UInt64(power))).encode()
        symbol = self._string_to_symbol()
        return '{amount}{symbol}'.format(amount=amount, symbol=symbol)


class AbiType(BaseObject):
    def __init__(self, d):
        self._validator = AbiTypeSchema()
        super(AbiType, self).__init__(d)

    def encode(self):
        new_type_name = self._encode_buffer(self.new_type_name)
        type = self._encode_buffer(self.type)
        return '{}{}'.format(new_type_name, type)


class AbiStructField(BaseObject):
    def __init__(self, d):
        self._validator = AbiStructFieldSchema()
        super(AbiStructField, self).__init__(d)

    def encode(self):
        name = self._encode_buffer(self.name)
        type = self._encode_buffer(self.type)
        return '{}{}'.format(name, type)


class AbiStruct(BaseObject):
    def __init__(self, d):
        self._validator = AbiStructSchema()
        super(AbiStruct, self).__init__(d)
        self.fields = self._create_obj_array(self.fields, AbiStructField)

    def encode(self):
        name = self._encode_buffer(self.name)
        base = self._encode_buffer(self.base)
        fields = self._encode_buffer(self.fields)
        return '{}{}{}'.format(name, base, fields)


class AbiAction(BaseObject):
    def __init__(self, d):
        self._validator = AbiActionSchema()
        super(AbiAction, self).__init__(d)

    def encode(self):
        name = self._encode_buffer(Name(self.name))
        type = self._encode_buffer(self.type)
        ricardian_contract = self._encode_buffer(self.ricardian_contract)
        return '{}{}{}'.format(name, type, ricardian_contract)


class AbiTable(BaseObject):
    def __init__(self, d):
        self._validator = AbiTableSchema()
        super(AbiTable, self).__init__(d)

    def encode(self):
        name = self._encode_buffer(Name(self.name))
        index_type = self._encode_buffer(self.index_type)
        key_names = self._encode_buffer(self.key_names)
        key_types = self._encode_buffer(self.key_types)
        type = self._encode_buffer(self.type)
        return '{}{}{}{}{}'.format(name, index_type, key_names, key_types, type)


class AbiRicardianClauses(BaseObject):
    def __init__(self, d):
        self._validator = AbiRicardianClauseSchema()
        super(AbiRicardianClauses, self).__init__(d)

    def encode(self):
        id = self._encode_buffer(self.id)
        body = self._encode_buffer(self.body)
        return '{}{}'.format(id, body)


class AbiErrorMessages(BaseObject):
    # TODO implement encode
    def __init__(self, d):
        self._validator = AbiErrorMessagesSchema()
        super(AbiErrorMessages, self).__init__(d)

    def encode():
        raise NotImplementedError


class AbiExtensions(BaseObject):
    # TODO implement encode
    def __init__(self, d):
        self._validator = AbiExtensionsSchema()
        super(AbiExtensions, self).__init__(d)

    def encode():
        raise NotImplementedError


class AbiVariants(BaseObject):
    # TODO implement encode
    def __init__(self, d):
        self._validator = AbiVariantsSchema()
        super(AbiVariants, self).__init__(d)

    def encode():
        raise NotImplementedError


class Abi(BaseObject):
    _abi_map = {
        # name
        'name': Name(),
        'string': str(),
        # numbers
        'bool': Byte(),
        'uint8': Byte(),
        'uint16': UInt16(),
        'uint32': UInt32(),
        'uint64': UInt64(),
        'int8': Byte(),       # NotImplemented
        'int16': Int16(),    # NotImplemented
        'int32': Int32(),    # NotImplemented
        'int64': Int64(),    # NotImplemented
        'float64': Float(),  # NotImplemented
        # 'varuint32': VarUInt # NotImplemented
        # complex
        'asset': Asset("1.0000 INR"),
        # 'checksum256': str,  # NotImplemented
        # 'block_timestamp_type': UInt64, # NotImplemented
        # 'time_point': UInt64, # NotImplemented
        # 'connector': str, # NotImplemented
        # 'public_key': str, # NotImplemented
        # 'authority': str, # NotImplemented
        # 'block_header': str, # NotImplemented
        # 'bytes': str, # NotImplemented
        # 'permission_level': str, # NotImplemented
        # 'permission_level_weight': str, #NotImplemented
    }

    def __init__(self, d):
        ''' '''
        self._validator = AbiSchema()
        super(Abi, self).__init__(d)
        self.types = self._create_obj_array(self.types, AbiType)
        self.structs = self._create_obj_array(self.structs, AbiStruct)
        self.actions = self._create_obj_array(self.actions, AbiAction)
        self.tables = self._create_obj_array(self.tables, AbiTable)
        self.ricardian_clauses = self._create_obj_array(self.ricardian_clauses, AbiRicardianClauses)
        self.error_messages = self._create_obj_array(self.error_messages, AbiErrorMessages)
        self.abi_extensions = self._create_obj_array(self.abi_extensions, AbiExtensions)
        self.variants = self._create_obj_array(self.variants, AbiVariants)

    def get_action(self, name):
        ''' '''
        for act in self.actions:
            if act.name == name:
                return act
        raise INRUnknownObj('{} is not a valid action for this contract'.format(name))

    def get_actions(self):
        actions = []
        for act in self.actions:
            actions.append(act.name)
        return actions

    def get_struct(self, name):
        ''' '''
        for struct in self.structs:
            if struct.name == name:
                return struct
        raise INRUnknownObj('{} is not a valid struct for this contract'.format(name))

    def get_action_parameters(self, name):
        ''' '''
        parameters = OrderedDict()
        # get the struct
        struct = self.get_struct(name)
        for field in struct.fields:
            f = field.type.strip('[]')
            if(f in self._abi_map):
                field_type = self._abi_map[f]
                # check if the field is a list
                if '[]' in field.type:
                    field_type = [field_type]
                parameters[field.name] = field_type
            else:
                raise INRUnknownObj("{} is not a known abi type".format(field.type))
        return parameters

    def get_raw(self):
        version = self._encode_buffer(self.version)
        # encode types
        types = self._encode_buffer(self.types)
        structs = self._encode_buffer(self.structs)
        actions = self._encode_buffer(self.actions)
        tables = self._encode_buffer(self.tables)
        ricardian_clauses = self._encode_buffer(self.ricardian_clauses)
        error_messages = self._encode_buffer(self.error_messages)
        abi_extensions = self._encode_buffer(self.abi_extensions)
        variants = self._encode_buffer(self.variants)
        return '{}{}{}{}{}{}{}{}{}'.format(version, types, structs, actions, tables,
                                           ricardian_clauses, error_messages, abi_extensions,
                                           variants)

    def encode(self):
        ''' '''
        raw_abi = self.get_raw()
        # divide by two because it is hex
        length = self._encode_buffer(VarUInt(len(raw_abi) / 2))
        return length + raw_abi

    def json_to_bin(self, name, data):
        # act = self.get_action(name)
        params = self.get_action_parameters(name)
        bin_buffer = ''
        for field in data:
            # create INRBuffer with value as a type of field
            if isinstance(params[field], list):
                field_type = type(params[field][0])
                arr = []
                for f in data[field]:
                    print(f)
                    arr.append(field_type(f))
                field_buffer = INRBuffer(arr)
            else:
                field_type = type(params[field])
                field_buffer = INRBuffer(field_type(data[field]))

            bin_buffer += field_buffer.encode()
        return bin_buffer


class Authorization(BaseObject):
    def __init__(self, d):
        ''' '''
        # create validator
        self._validator = PermissionLevelSchema()
        super(Authorization, self).__init__(d)

    def encode(self):
        ''' '''
        actor = self._encode_buffer(AccountName(self.actor))
        perms = self._encode_buffer(PermissionName(self.permission))
        return '{}{}'.format(actor, perms)


class ChainInfo(BaseObject):
    def __init__(self, d):
        ''' '''
        self._validator = ChainInfoSchema()
        super(ChainInfo, self).__init__(d)


class BlockInfo(BaseObject):
    def __init__(self, d):
        ''' '''
        self._validator = BlockInfoSchema()
        super(BlockInfo, self).__init__(d)


class Transaction(BaseObject):
    def __init__(self, d, chain_info, lib_info):
        ''' '''
        # add defaults
        if 'expiration' not in d:
            d['expiration'] = str((dt.datetime.utcnow() + dt.timedelta(seconds=30)).replace(tzinfo=pytz.UTC))
        if 'ref_block_num' not in d:
            d['ref_block_num'] = chain_info['last_irreversible_block_num'] & 0xFFFF
        if 'ref_block_prefix' not in d:
            d['ref_block_prefix'] = lib_info['ref_block_prefix']
        # validate
        self._validator = TransactionSchema()
        super(Transaction, self).__init__(d)
        # parse actions
        self.actions = self._create_obj_array(self.actions, Action)

    def _encode_hdr(self):
        ''' '''
        # convert
        exp_ts = (self.expiration - dt.datetime(1970, 1, 1, tzinfo=self.expiration.tzinfo)).total_seconds()
        exp = self._encode_buffer(UInt32(exp_ts))
        ref_blk = self._encode_buffer(UInt16(self.ref_block_num & 0xffff))
        ref_block_prefix = self._encode_buffer(UInt32(self.ref_block_prefix))
        net_usage_words = self._encode_buffer(VarUInt(self.net_usage_words))
        max_cpu_usage_ms = self._encode_buffer(Byte(self.max_cpu_usage_ms))
        delay_sec = self._encode_buffer(VarUInt(self.delay_sec))
        # create hdr buffer
        hdr = '{}{}{}{}{}{}'.format(exp, ref_blk, ref_block_prefix, net_usage_words, max_cpu_usage_ms, delay_sec)
        return hdr

    def encode(self):
        ''' '''
        hdr_buf = self._encode_hdr()
        context_actions = self._encode_buffer(self.context_free_actions)
        actions = self._encode_buffer(self.actions)
        trans_exts = self._encode_buffer(self.transaction_extensions)
        return bytearray.fromhex(hdr_buf + context_actions + actions + trans_exts)

    def get_id(self):
        return sha256(self.encode())


class PackedTransaction:
    def __init__(self, trx, ce):
        self._cline = ce
        self._packed_trx = trx
        # empty header
        self._is_unpacked = False
        self._unpacked_trx = OrderedDict()

    def _decode_buffer(self, objType, buf):
        ''' '''
        eBuf = INRBuffer("")
        return eBuf.decode(objType, buf)

    def _decode_header(self, buf):
        ''' '''
        buf = self._packed_trx
        # get expiration buffer
        (exp, buf) = self._decode_buffer(UInt32(), buf)
        # get expiration in UTC
        exp_dt = dt.datetime.utcfromtimestamp(exp)
        self._unpacked_trx['expiration'] = exp_dt.strftime("%Y-%m-%dT%H:%M:%S")
        # get ref_block
        (ref_blk, buf) = self._decode_buffer(UInt16(), buf)
        self._unpacked_trx['ref_block_num'] = ref_blk
        # get ref_block_prefix
        (ref_blk_pre, buf) = self._decode_buffer(UInt32(), buf)
        self._unpacked_trx['ref_block_prefix'] = ref_blk_pre
        # get net usage
        (max_net_usage, buf) = self._decode_buffer(VarUInt(), buf)
        self._unpacked_trx['max_net_usage_words'] = max_net_usage
        # get cpu usage
        (max_cpu_usage, buf) = self._decode_buffer(Byte(), buf)
        self._unpacked_trx['max_cpu_usage_ms'] = max_cpu_usage
        # get delay sec
        (delay_sec, buf) = self._decode_buffer(VarUInt(), buf)
        self._unpacked_trx['delay_sec'] = delay_sec
        return buf

    def decode_actions(self, buf):
        ''' '''
        # get length of action array
        actions = []
        (length, act_buf) = self._decode_buffer(VarUInt(), buf)
        cnt = 0
        # loop through array
        while cnt < length and length:
            # process action account/name
            (acct_name, act_buf) = self._decode_buffer(AccountName(), act_buf)
            (action_name, act_buf) = self._decode_buffer(ActionName(), act_buf)
            # get authorizations
            (auth, act_buf) = self.decode_authorizations(act_buf)
            # get data length
            (hex_data_len, act_buf) = self._decode_buffer(VarUInt(), act_buf)
            # get abi information
            contract_abi = self._cline.get_abi(acct_name)
            abi = Abi(contract_abi["abi"])
            abi_act = abi.get_action(action_name)
            # temp check need to handle this better
            if abi_act["type"] != action_name:
                raise INRAbiProcessingError("Error processing the {} action".format(action_name))
            abi_struct = abi.get_action_parameters(action_name)
            data = OrderedDict()
            # save data for hex_data
            data_diff = act_buf
            for a in abi_struct:
                (act_data, act_buf) = self._decode_buffer(abi_struct[a], act_buf)
                data[a] = act_data
            act = OrderedDict({
                'account': acct_name,
                'name': action_name,
                "authorization": auth,
                "data": data,
                "hex_data": data_diff.rstrip(act_buf),
            })
            actions.append(act)
            # increment count
            cnt += 1

        return (actions, act_buf)

    def decode_authorizations(self, buf):
        ''' '''
        auths = []
        (length, auth_buf) = self._decode_buffer(VarUInt(), buf)
        cnt = 0
        while cnt < length and length:
            # process action account/name
            (acct_name, auth_buf) = self._decode_buffer(AccountName(), auth_buf)
            (perm, auth_buf) = self._decode_buffer(ActionName(), auth_buf)
            auth = OrderedDict({
                'actor': acct_name,
                'permission': perm,
            })
            auths.append(auth)
            cnt += 1
        return (auths, auth_buf)

    # placeholder until context_free_actions are implemented. Might be able to use self.decode_actions
    def decode_context_actions(self, buf):
        ''' '''
        (length, ctx_buf) = self._decode_buffer(VarUInt(), buf)
        if length > 0:
            raise NotImplementedError("Currently inerypy does not support context_free_actions")
        # get length of action array
        return (length, ctx_buf)

    # placeholder until context_free_actions are implemented. Might be able to use self.decode_actions
    def decode_trx_extensions(self, buf):
        ''' '''
        trx_ext = []
        (length, ctx_buf) = self._decode_buffer(VarUInt(), buf)
        if length > 0:
            raise NotImplementedError("Currently inerypy does not support transaction extensions")
        # get length of action array
        return (trx_ext, ctx_buf)

    def get_id(self):
        ''' '''
        return sha256(bytearray.fromhex(self._packed_trx))

    def get_transaction(self):
        ''' '''
        # only unpack once
        if not self._is_unpacked:
            # decode the header and get the rest of the trx back
            trx_buf = self._decode_header(self._packed_trx)
            # process list of context free actions
            (context_actions, trx_buf) = self.decode_context_actions(trx_buf)
            self._unpacked_trx['context_free_actions'] = context_actions
            # process actions
            (actions, trx_buf) = self.decode_actions(trx_buf)
            self._unpacked_trx['actions'] = actions
            # process transaction extensions
            (trx_ext, trx_buf) = self.decode_trx_extensions(trx_buf)
            self._unpacked_trx['transaction_extensions'] = trx_ext
            # set boolean
            self._is_unpacked = True
        return self._unpacked_trx


class INRBuffer:
    def __init__(self, v):
        self._value = v
        self._count = 0

    def _decode_number(self, val, format='L'):
        byte_val = binascii.unhexlify(val)
        return convert_big_endian(byte_val, format)

    def _decode_float(self, val, format='f'):
        byte_val = binascii.unhexlify(val)
        return struct.unpack(">{}".format(format), byte_val)

    def _decode_name(self, val, format='Q'):
        ''' '''
        num = self._decode_number(val, format)
        return name_to_string(num)

    def _decode_str(self, val):
        ''' '''
        # get length
        vu = VarUInt()
        (length, val) = vu.decode(val)
        string = ''
        leftover = val
        # if there is data parse it
        if length > 0:
            (str_data, leftover) = self._splice_buf(val, length * 2)
            string = binascii.unhexlify(str_data).decode()
        return (string, leftover)

    def _splice_buf(self, buf, length):
        return buf[:length], buf[length:]

    def _write_number(self, val, format='q'):
        ''' '''
        le = convert_little_endian(val, format)
        return binascii.hexlify(le).decode()

    def _write_name(self, w_str):
        ''' '''
        val = string_to_name(w_str)
        le = convert_little_endian(val, 'Q')
        return binascii.hexlify(le).decode()

    def _write_str(self, w_str):
        b = bytearray()
        length = VarUInt(len(w_str)).encode()
        b.extend(map(ord, w_str))
        return binascii.hexlify(length + b).decode()

    def _write_varuint(self, vuint):
        buf = vuint.encode()
        return binascii.hexlify(buf).decode()

    def decode(self, objType, buf=None):
        leftover = ""
        if not buf:
            buf = self._value
        if isinstance(objType, UInt32):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_number(val, 'I')
        elif isinstance(objType, UInt16):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_number(val, 'H')
        elif isinstance(objType, VarUInt):
            (val, leftover) = objType.decode(buf)
        elif(isinstance(objType, Byte) or
             isinstance(objType, bool)):
            (hex_str, leftover) = self._splice_buf(buf, 2)
            val = hex_to_int(hex_str)
        elif isinstance(objType, Float):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_float(val, 'f')
        elif(isinstance(objType, int) or
             isinstance(objType, long)):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_number(val, 'q')
        elif (isinstance(objType, Name) or
              isinstance(objType, AccountName) or
              isinstance(objType, PermissionName) or
              isinstance(objType, ActionName) or
              isinstance(objType, TableName) or
              isinstance(objType, ScopeName)):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_name(val)
        elif isinstance(objType, str):
            (val, leftover) = self._decode_str(buf)
        elif(isinstance(objType, list)):
            # get count(VarUint)
            val = []
            (length, leftover) = VarUInt("").decode(buf)
            while len(val) < length:
                (out, leftover) = self.decode(objType[0], leftover)
                val.append(out)
        else:
            raise INRBufferInvalidType("Cannot decode type: {}".format(type(objType)))

        return (val, leftover)

    def encode(self, val=None):
        if not val:
            val = self._value
        if (isinstance(val, Name) or
            isinstance(val, AccountName) or
            isinstance(val, PermissionName) or
            isinstance(val, ActionName) or
            isinstance(val, TableName) or
                isinstance(val, ScopeName)):
            val = self._write_name(val)
            return val
        elif(isinstance(val, str)):
            return self._write_str(val)
        elif(isinstance(val, Byte) or
             isinstance(val, bool)):
            # return self._write_number(val, '?')
            return int_to_hex(val)
        elif(isinstance(val, UInt16)):
            return self._write_number(val, 'H')
        elif(isinstance(val, UInt32)):
            return self._write_number(val, 'I')
        elif(isinstance(val, UInt64)):
            return self._write_number(val, 'q')
        elif(isinstance(val, Float)):
            return self._write_number(val, 'f')
        elif(isinstance(val, VarUInt)):
            # temp encoding
            return self._write_varuint(val)
        elif(isinstance(val, int) or
             isinstance(val, long)):
            return self._write_number(val, 'l')
        elif(isinstance(val, Action) or
             isinstance(val, AbiStruct) or
             isinstance(val, AbiStructField) or
             isinstance(val, AbiType) or
             isinstance(val, AbiAction) or
             isinstance(val, AbiTable) or
             isinstance(val, AbiRicardianClauses) or
             isinstance(val, AbiErrorMessages) or
             isinstance(val, AbiExtensions) or
             isinstance(val, AbiVariants) or
             isinstance(val, Asset) or
             isinstance(val, Authorization)):
            return val.encode()
        elif(isinstance(val, list)):
            buf = self._write_varuint(VarUInt(len(val)))
            for item in val:
                e_item = self.encode(item)
                buf = '{}{}'.format(buf, e_item)
            return buf
        else:
            raise INRBufferInvalidType('Cannot encode type: {}'.format(type(val)))

class InvalidKeyFile(Exception):
    ''' Raised when the key file format is invalid '''
    pass


class INRKeyError(Exception):
    ''' Raised when there is an INRKey error '''
    pass


class INRMsigInvalidProposal(Exception):
    ''' Raised when an invalid proposal is queried'''
    pass


class INRBufferInvalidType(Exception):
    ''' Raised when trying to encode/decode an invalid type '''
    pass


class INRInvalidSchema(Exception):
    ''' Raised when trying to process a schema '''
    pass


class INRUnknownObj(Exception):
    ''' Raised when an object is not found in the ABI '''
    pass


class INRAbiProcessingError(Exception):
    ''' Raised when the abi action cannot be processed '''
    pass


class INRSetSameCode(Exception):
    ''' Raised when the code would not change on a set'''
    pass


class INRSetSameAbi(Exception):
    ''' Raised when the abi would not change on a set'''
    pass




def convert_little_endian(buf, format='q'):
    ''' '''
    return struct.pack('<{}'.format(format), buf)


def convert_big_endian(buf, format="I"):
    ''' '''
    # return the first value of the tuple that is returned by unpack
    return struct.unpack('<{}'.format(format), buf)[0]

# json encoder


class INREncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Action):
            return o.__dict__
        if isinstance(o, Authorization):
            return o.__dict__
        if isinstance(o, dt.datetime):
            return o.isoformat()


class Name(str):
    hex_str_len = 16


class AccountName(Name):
    pass


class PermissionName(Name):
    pass


class ActionName(Name):
    pass


class TableName(Name):
    pass


class ScopeName(Name):
    pass


class Byte(int):
    # length of hex str
    hex_str_len = 2


class UInt16(int):
    # length of hex str
    hex_str_len = 4


class UInt32(int):
    # length of hex str
    hex_str_len = 8


class UInt64(int):
    # length of hex str
    hex_str_len = 16


class Int16(int):
    # length of hex str
    hex_str_len = 4


class Int32(int):
    # length of hex str
    hex_str_len = 8


class Int64(int):
    # length of hex str
    hex_str_len = 16


class Float(float):
    # length of hex str
    hex_str_len = 8


if six.PY3:
    class long(int):
        pass


class VarUInt:
    def __init__(self, val=""):
        ''' '''
        self._val = val
        self._b_arr = bytearray()

    def _push_byte(self, val):
        self._b_arr.append(int(val))

    def encode(self):
        ''' '''
        # ensure value is an int
        val = int(self._val)
        buf = int((val) & 0x7f)
        val >>= 7
        buf |= (((val > 0) if 1 else 0) << 7)
        self._push_byte(buf)
        while val:
            buf = int((val) & 0x7f)
            val >>= 7
            buf |= (((val > 0) if 1 else 0) << 7)
            self._push_byte(buf)
        return self._b_arr

    def _pop(self, buf, length):
        return buf[:length], buf[length:]

    def decode(self, buf):
        ''' '''
        shift = 0
        result = 0
        while True:
            tmp, buf = self._pop(buf, 2)
            i = hex_to_int(tmp)
            result |= (i & 0x7f) << shift
            shift += 7
            if not(i & 0x80):
                break
        return result, buf


class BaseObject(object):
    def __init__(self, d):
        ''' '''
        try:
            self._obj = self._validator.deserialize(d)
        except Invalid:
            raise INRInvalidSchema('Unable to process schema for {}'.format(type(self)))
        # instantiate the class
        for k, v in self._obj.items():
            setattr(self, k, v)
        # clean up
        del self._obj
        del self._validator

    def __repr__(self):
        ''' '''
        return '{}({})'.format(self.__class__, self.__dict__)

    def _encode_buffer(self, value):
        ''' '''
        return INRBuffer(value).encode()

    def _create_obj_array(self, arr, class_type):
        ''' '''
        new_arr = []
        for item in arr:
            new_arr.append(class_type(item))
        return new_arr


class Action(BaseObject):
    def __init__(self, d):
        ''' '''
        self._validator = ActionSchema()
        super(Action, self).__init__(d)
        # setup permissions
        self.authorization = self._create_obj_array(self.authorization, Authorization)

    def encode(self):
        ''' '''
        acct = self._encode_buffer(AccountName(self.account))
        name = self._encode_buffer(Name(self.name))
        auth = self._encode_buffer(self.authorization)
        # need to figure out how to process data
        # get length
        data_len = self._encode_buffer(VarUInt(len(self.data) / 2))
        data = data_len + self.data
        return '{}{}{}{}'.format(acct, name, auth, data)


class Asset:
    def __init__(self, value, precision=4):
        # self.amount = amt
        # self.symbol = sym
        # self.precision = precision
        self.from_string(value)

    def __str__(self):
        return '{amount:.{precision}f} {symbol}'.format(amount=self.amount, symbol=self.symbol, precision=self.precision)

    def __add__(self, other):
        if self.symbol != other.symbol:
            raise TypeError('Symbols must match: {} != {}', self.symbol, other.symbol)
        return Asset(self.amount + other.amount, self.symbol)

    def __sub__(self, other):
        if self.amount - other.amount < 0:
            raise ValueError('Subtraction would result in a negative.')
        if self.symbol != other.symbol:
            raise TypeError('Symbols must match: {} != {}', self.symbol, other.symbol)
        return Asset(self.amount - other.amount, self.symbol)

    def from_string(self, s):
        splt = s.split()
        try:
            self.amount = float(splt[0])
            self.symbol = splt[1]
            self.precision = len(splt[0].split(".")[1])
        except IndexError:
            raise IndexError('Invalid string format given. Must be in the formst <float> <currency_type>')

    def _string_to_symbol(self):
        ''' '''
        rslt = 0
        cnt = 0
        while cnt < len(self.symbol):
            letter = self.symbol[cnt]
            if letter >= 'A' or letter <= 'Z':
                l = ord(letter)
                rslt |= (UInt64(l) << (8 * (cnt + 1)))
            else:
                raise ValueError("{} contains an invalid symbol. Must be [A-Z].".format(self.symbol))

            cnt += 1
        rslt |= UInt64(self.precision)
        return INRBuffer(UInt64(rslt)).encode()

    def encode(self):
        ''' '''
        power = '1'.ljust(self.precision + len('1'), '0')
        amount = INRBuffer(UInt64(self.amount * UInt64(power))).encode()
        symbol = self._string_to_symbol()
        return '{amount}{symbol}'.format(amount=amount, symbol=symbol)


class AbiType(BaseObject):
    def __init__(self, d):
        self._validator = AbiTypeSchema()
        super(AbiTypesSchema, self).__init__(d)

    def encode(self):
        new_type_name = self._encode_buffer(self.new_type_name)
        type = self._encode_buffer(self.type)
        return '{}{}'.format(new_type_name, type)


class AbiStructField(BaseObject):
    def __init__(self, d):
        self._validator = AbiStructFieldSchema()
        super(AbiStructField, self).__init__(d)

    def encode(self):
        name = self._encode_buffer(self.name)
        type = self._encode_buffer(self.type)
        return '{}{}'.format(name, type)


class AbiStruct(BaseObject):
    def __init__(self, d):
        self._validator = AbiStructSchema()
        super(AbiStruct, self).__init__(d)
        self.fields = self._create_obj_array(self.fields, AbiStructField)

    def encode(self):
        name = self._encode_buffer(self.name)
        base = self._encode_buffer(self.base)
        fields = self._encode_buffer(self.fields)
        return '{}{}{}'.format(name, base, fields)


class AbiAction(BaseObject):
    def __init__(self, d):
        self._validator = AbiActionSchema()
        super(AbiAction, self).__init__(d)

    def encode(self):
        name = self._encode_buffer(Name(self.name))
        type = self._encode_buffer(self.type)
        ricardian_contract = self._encode_buffer(self.ricardian_contract)
        return '{}{}{}'.format(name, type, ricardian_contract)


class AbiTable(BaseObject):
    def __init__(self, d):
        self._validator = AbiTableSchema()
        super(AbiTable, self).__init__(d)

    def encode(self):
        name = self._encode_buffer(Name(self.name))
        index_type = self._encode_buffer(self.index_type)
        key_names = self._encode_buffer(self.key_names)
        key_types = self._encode_buffer(self.key_types)
        type = self._encode_buffer(self.type)
        return '{}{}{}{}{}'.format(name, index_type, key_names, key_types, type)


class AbiRicardianClauses(BaseObject):
    def __init__(self, d):
        self._validator = AbiRicardianClauseSchema()
        super(AbiRicardianClauses, self).__init__(d)

    def encode(self):
        id = self._encode_buffer(self.id)
        body = self._encode_buffer(self.body)
        return '{}{}'.format(id, body)


class AbiErrorMessages(BaseObject):
    # TODO implement encode
    def __init__(self, d):
        self._validator = AbiErrorMessagesSchema()
        super(AbiErrorMessages, self).__init__(d)


class AbiExtensions(BaseObject):
    # TODO implement encode
    def __init__(self, d):
        self._validator = AbiExtensionsSchema()
        super(AbiExtensions, self).__init__(d)



class AbiVariants(BaseObject):
    # TODO implement encode
    def __init__(self, d):
        self._validator = AbiVariantsSchema()
        super(AbiVariants, self).__init__(d)



class Abi(BaseObject):
    _abi_map = {
        # name
        'name': Name(),
        'string': str(),
        # numbers
        'bool': Byte(),
        'uint8': Byte(),
        'uint16': UInt16(),
        'uint32': UInt32(),
        'uint64': UInt64(),
        'int8': Byte(),       # NotImplemented
        'int16': Int16(),    # NotImplemented
        'int32': Int32(),    # NotImplemented
        'int64': Int64(),    # NotImplemented
        'float64': Float(),  # NotImplemented
        # 'varuint32': VarUInt # NotImplemented
        # complex
        'asset': Asset("1.0000 INR"),
        # 'checksum256': str,  # NotImplemented
        # 'block_timestamp_type': UInt64, # NotImplemented
        # 'time_point': UInt64, # NotImplemented
        # 'connector': str, # NotImplemented
        # 'public_key': str, # NotImplemented
        # 'authority': str, # NotImplemented
        # 'block_header': str, # NotImplemented
        # 'bytes': str, # NotImplemented
        # 'permission_level': str, # NotImplemented
        # 'permission_level_weight': str, #NotImplemented
    }

    def __init__(self, d):
        ''' '''
        self._validator = AbiSchema()
        super(Abi, self).__init__(d)
        self.types = self._create_obj_array(self.types, AbiType)
        self.structs = self._create_obj_array(self.structs, AbiStruct)
        self.actions = self._create_obj_array(self.actions, AbiAction)
        self.tables = self._create_obj_array(self.tables, AbiTable)
        self.ricardian_clauses = self._create_obj_array(self.ricardian_clauses, AbiRicardianClauses)
        self.error_messages = self._create_obj_array(self.error_messages, AbiErrorMessages)
        self.abi_extensions = self._create_obj_array(self.abi_extensions, AbiExtensions)
        self.variants = self._create_obj_array(self.variants, AbiVariants)

    def get_action(self, name):
        ''' '''
        for act in self.actions:
            if act.name == name:
                return act
        raise INRUnknownObj('{} is not a valid action for this contract'.format(name))

    def get_actions(self):
        actions = []
        for act in self.actions:
            actions.append(act.name)
        return actions

    def get_struct(self, name):
        ''' '''
        for struct in self.structs:
            if struct.name == name:
                return struct
        raise INRUnknownObj('{} is not a valid struct for this contract'.format(name))

    def get_action_parameters(self, name):
        ''' '''
        parameters = OrderedDict()
        # get the struct
        struct = self.get_struct(name)
        for field in struct.fields:
            f = field.type.strip('[]')
            if(f in self._abi_map):
                field_type = self._abi_map[f]
                # check if the field is a list
                if '[]' in field.type:
                    field_type = [field_type]
                parameters[field.name] = field_type
            else:
                raise INRUnknownObj("{} is not a known abi type".format(field.type))
        return parameters

    def get_raw(self):
        version = self._encode_buffer(self.version)
        # encode types
        types = self._encode_buffer(self.types)
        structs = self._encode_buffer(self.structs)
        actions = self._encode_buffer(self.actions)
        tables = self._encode_buffer(self.tables)
        ricardian_clauses = self._encode_buffer(self.ricardian_clauses)
        error_messages = self._encode_buffer(self.error_messages)
        abi_extensions = self._encode_buffer(self.abi_extensions)
        variants = self._encode_buffer(self.variants)
        return '{}{}{}{}{}{}{}{}{}'.format(version, types, structs, actions, tables,
                                           ricardian_clauses, error_messages, abi_extensions,
                                           variants)

    def encode(self):
        ''' '''
        raw_abi = self.get_raw()
        # divide by two because it is hex
        length = self._encode_buffer(VarUInt(len(raw_abi) / 2))
        return length + raw_abi

    def json_to_bin(self, name, data):
        # act = self.get_action(name)
        params = self.get_action_parameters(name)
        bin_buffer = ''
        for field in data:
            # create INRBuffer with value as a type of field
            if isinstance(params[field], list):
                field_type = type(params[field][0])
                arr = []
                for f in data[field]:
                    print(f)
                    arr.append(field_type(f))
                field_buffer = INRBuffer(arr)
            else:
                field_type = type(params[field])
                field_buffer = INRBuffer(field_type(data[field]))

            bin_buffer += field_buffer.encode()
        return bin_buffer


class Authorization(BaseObject):
    def __init__(self, d):
        ''' '''
        # create validator
        self._validator = PermissionLevelSchema()
        super(Authorization, self).__init__(d)

    def encode(self):
        ''' '''
        actor = self._encode_buffer(AccountName(self.actor))
        perms = self._encode_buffer(PermissionName(self.permission))
        return '{}{}'.format(actor, perms)


class ChainInfo(BaseObject):
    def __init__(self, d):
        ''' '''
        self._validator = ChainInfoSchema()
        super(ChainInfo, self).__init__(d)


class BlockInfo(BaseObject):
    def __init__(self, d):
        ''' '''
        self._validator = BlockInfoSchema()
        super(BlockInfo, self).__init__(d)


class Transaction(BaseObject):
    def __init__(self, d, chain_info, lib_info):
        ''' '''
        # add defaults
        if 'expiration' not in d:
            d['expiration'] = str((dt.datetime.utcnow() + dt.timedelta(seconds=30)).replace(tzinfo=pytz.UTC))
        if 'ref_block_num' not in d:
            d['ref_block_num'] = chain_info['last_irreversible_block_num'] & 0xFFFF
        if 'ref_block_prefix' not in d:
            d['ref_block_prefix'] = lib_info['ref_block_prefix']
        # validate
        self._validator = TransactionSchema()
        super(Transaction, self).__init__(d)
        # parse actions
        self.actions = self._create_obj_array(self.actions, Action)

    def _encode_hdr(self):
        ''' '''
        # convert
        exp_ts = (self.expiration - dt.datetime(1970, 1, 1, tzinfo=self.expiration.tzinfo)).total_seconds()
        exp = self._encode_buffer(UInt32(exp_ts))
        ref_blk = self._encode_buffer(UInt16(self.ref_block_num & 0xffff))
        ref_block_prefix = self._encode_buffer(UInt32(self.ref_block_prefix))
        net_usage_words = self._encode_buffer(VarUInt(self.net_usage_words))
        max_cpu_usage_ms = self._encode_buffer(Byte(self.max_cpu_usage_ms))
        delay_sec = self._encode_buffer(VarUInt(self.delay_sec))
        # create hdr buffer
        hdr = '{}{}{}{}{}{}'.format(exp, ref_blk, ref_block_prefix, net_usage_words, max_cpu_usage_ms, delay_sec)
        return hdr

    def encode(self):
        ''' '''
        hdr_buf = self._encode_hdr()
        context_actions = self._encode_buffer(self.context_free_actions)
        actions = self._encode_buffer(self.actions)
        trans_exts = self._encode_buffer(self.transaction_extensions)
        return bytearray.fromhex(hdr_buf + context_actions + actions + trans_exts)

    def get_id(self):
        return sha256(self.encode())


class PackedTransaction:
    def __init__(self, trx, ce):
        self._cline = ce
        self._packed_trx = trx
        # empty header
        self._is_unpacked = False
        self._unpacked_trx = OrderedDict()

    def _decode_buffer(self, objType, buf):
        ''' '''
        eBuf = INRBuffer("")
        return eBuf.decode(objType, buf)

    def _decode_header(self, buf):
        ''' '''
        buf = self._packed_trx
        # get expiration buffer
        (exp, buf) = self._decode_buffer(UInt32(), buf)
        # get expiration in UTC
        exp_dt = dt.datetime.utcfromtimestamp(exp)
        self._unpacked_trx['expiration'] = exp_dt.strftime("%Y-%m-%dT%H:%M:%S")
        # get ref_block
        (ref_blk, buf) = self._decode_buffer(UInt16(), buf)
        self._unpacked_trx['ref_block_num'] = ref_blk
        # get ref_block_prefix
        (ref_blk_pre, buf) = self._decode_buffer(UInt32(), buf)
        self._unpacked_trx['ref_block_prefix'] = ref_blk_pre
        # get net usage
        (max_net_usage, buf) = self._decode_buffer(VarUInt(), buf)
        self._unpacked_trx['max_net_usage_words'] = max_net_usage
        # get cpu usage
        (max_cpu_usage, buf) = self._decode_buffer(Byte(), buf)
        self._unpacked_trx['max_cpu_usage_ms'] = max_cpu_usage
        # get delay sec
        (delay_sec, buf) = self._decode_buffer(VarUInt(), buf)
        self._unpacked_trx['delay_sec'] = delay_sec
        return buf

    def decode_actions(self, buf):
        ''' '''
        # get length of action array
        actions = []
        (length, act_buf) = self._decode_buffer(VarUInt(), buf)
        cnt = 0
        # loop through array
        while cnt < length and length:
            # process action account/name
            (acct_name, act_buf) = self._decode_buffer(AccountName(), act_buf)
            (action_name, act_buf) = self._decode_buffer(ActionName(), act_buf)
            # get authorizations
            (auth, act_buf) = self.decode_authorizations(act_buf)
            # get data length
            (hex_data_len, act_buf) = self._decode_buffer(VarUInt(), act_buf)
            # get abi information
            contract_abi = self._cline.get_abi(acct_name)
            abi = Abi(contract_abi["abi"])
            abi_act = abi.get_action(action_name)
            # temp check need to handle this better
            if abi_act["type"] != action_name:
                raise INRAbiProcessingError("Error processing the {} action".format(action_name))
            abi_struct = abi.get_action_parameters(action_name)
            data = OrderedDict()
            # save data for hex_data
            data_diff = act_buf
            for a in abi_struct:
                (act_data, act_buf) = self._decode_buffer(abi_struct[a], act_buf)
                data[a] = act_data
            act = OrderedDict({
                'account': acct_name,
                'name': action_name,
                "authorization": auth,
                "data": data,
                "hex_data": data_diff.rstrip(act_buf),
            })
            actions.append(act)
            # increment count
            cnt += 1

        return (actions, act_buf)

    def decode_authorizations(self, buf):
        ''' '''
        auths = []
        (length, auth_buf) = self._decode_buffer(VarUInt(), buf)
        cnt = 0
        while cnt < length and length:
            # process action account/name
            (acct_name, auth_buf) = self._decode_buffer(AccountName(), auth_buf)
            (perm, auth_buf) = self._decode_buffer(ActionName(), auth_buf)
            auth = OrderedDict({
                'actor': acct_name,
                'permission': perm,
            })
            auths.append(auth)
            cnt += 1
        return (auths, auth_buf)

    def decode_trx_extensions(self, buf):
        ''' '''
        trx_ext = []
        (length, ctx_buf) = self._decode_buffer(VarUInt(), buf)
        if length > 0:
            raise NotImplementedError("Currently inerypy does not support transaction extensions")
        # get length of action array
        return (trx_ext, ctx_buf)

    def get_id(self):
        ''' '''
        return sha256(bytearray.fromhex(self._packed_trx))

    def get_transaction(self):
        ''' '''
        # only unpack once
        if not self._is_unpacked:
            # decode the header and get the rest of the trx back
            trx_buf = self._decode_header(self._packed_trx)
            # process list of context free actions
            (context_actions, trx_buf) = self.decode_context_actions(trx_buf)
            self._unpacked_trx['context_free_actions'] = context_actions
            # process actions
            (actions, trx_buf) = self.decode_actions(trx_buf)
            self._unpacked_trx['actions'] = actions
            # process transaction extensions
            (trx_ext, trx_buf) = self.decode_trx_extensions(trx_buf)
            self._unpacked_trx['transaction_extensions'] = trx_ext
            # set boolean
            self._is_unpacked = True
        return self._unpacked_trx


class INRBuffer:
    def __init__(self, v):
        self._value = v
        self._count = 0

    def _decode_number(self, val, format='L'):
        byte_val = binascii.unhexlify(val)
        return convert_big_endian(byte_val, format)

    def _decode_float(self, val, format='f'):
        byte_val = binascii.unhexlify(val)
        return struct.unpack(">{}".format(format), byte_val)

    def _decode_name(self, val, format='Q'):
        ''' '''
        num = self._decode_number(val, format)
        return name_to_string(num)

    def _decode_str(self, val):
        ''' '''
        # get length
        vu = VarUInt()
        (length, val) = vu.decode(val)
        string = ''
        leftover = val
        # if there is data parse it
        if length > 0:
            (str_data, leftover) = self._splice_buf(val, length * 2)
            string = binascii.unhexlify(str_data).decode()
        return (string, leftover)

    def _splice_buf(self, buf, length):
        return buf[:length], buf[length:]

    def _write_number(self, val, format='q'):
        ''' '''
        le = convert_little_endian(val, format)
        return binascii.hexlify(le).decode()

    def _write_name(self, w_str):
        ''' '''
        val = string_to_name(w_str)
        le = convert_little_endian(val, 'Q')
        return binascii.hexlify(le).decode()

    def _write_str(self, w_str):
        b = bytearray()
        length = VarUInt(len(w_str)).encode()
        b.extend(map(ord, w_str))
        return binascii.hexlify(length + b).decode()

    def _write_varuint(self, vuint):
        buf = vuint.encode()
        return binascii.hexlify(buf).decode()

    def decode(self, objType, buf=None):
        leftover = ""
        if not buf:
            buf = self._value
        if isinstance(objType, UInt32):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_number(val, 'I')
        elif isinstance(objType, UInt16):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_number(val, 'H')
        elif isinstance(objType, VarUInt):
            (val, leftover) = objType.decode(buf)
        elif(isinstance(objType, Byte) or
             isinstance(objType, bool)):
            (hex_str, leftover) = self._splice_buf(buf, 2)
            val = hex_to_int(hex_str)
        elif isinstance(objType, Float):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_float(val, 'f')
        elif(isinstance(objType, int) or
             isinstance(objType, long)):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_number(val, 'q')
        elif (isinstance(objType, Name) or
              isinstance(objType, AccountName) or
              isinstance(objType, PermissionName) or
              isinstance(objType, ActionName) or
              isinstance(objType, TableName) or
              isinstance(objType, ScopeName)):
            (val, leftover) = self._splice_buf(buf, objType.hex_str_len)
            val = self._decode_name(val)
        elif isinstance(objType, str):
            (val, leftover) = self._decode_str(buf)
        elif(isinstance(objType, list)):
            # get count(VarUint)
            val = []
            (length, leftover) = VarUInt("").decode(buf)
            while len(val) < length:
                (out, leftover) = self.decode(objType[0], leftover)
                val.append(out)
        else:
            raise INRBufferInvalidType("Cannot decode type: {}".format(type(objType)))

        return (val, leftover)

    def encode(self, val=None):
        if not val:
            val = self._value
        if (isinstance(val, Name) or
            isinstance(val, AccountName) or
            isinstance(val, PermissionName) or
            isinstance(val, ActionName) or
            isinstance(val, TableName) or
                isinstance(val, ScopeName)):
            val = self._write_name(val)
            return val
        elif(isinstance(val, str)):
            return self._write_str(val)
        elif(isinstance(val, Byte) or
             isinstance(val, bool)):
            # return self._write_number(val, '?')
            return int_to_hex(val)
        elif(isinstance(val, UInt16)):
            return self._write_number(val, 'H')
        elif(isinstance(val, UInt32)):
            return self._write_number(val, 'I')
        elif(isinstance(val, UInt64)):
            return self._write_number(val, 'q')
        elif(isinstance(val, Float)):
            return self._write_number(val, 'f')
        elif(isinstance(val, VarUInt)):
            # temp encoding
            return self._write_varuint(val)
        elif(isinstance(val, int) or
             isinstance(val, long)):
            return self._write_number(val, 'l')
        elif(isinstance(val, Action) or
             isinstance(val, AbiStruct) or
             isinstance(val, AbiStructField) or
             isinstance(val, AbiType) or
             isinstance(val, AbiAction) or
             isinstance(val, AbiTable) or
             isinstance(val, AbiRicardianClauses) or
             isinstance(val, AbiErrorMessages) or
             isinstance(val, AbiExtensions) or
             isinstance(val, AbiVariants) or
             isinstance(val, Asset) or
             isinstance(val, Authorization)):
            return val.encode()
        elif(isinstance(val, list)):
            buf = self._write_varuint(VarUInt(len(val)))
            for item in val:
                e_item = self.encode(item)
                buf = '{}{}'.format(buf, e_item)
            return buf
        else:
            raise INRBufferInvalidType('Cannot encode type: {}'.format(type(val)))
