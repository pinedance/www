import re
from datetime import datetime

DEBUGGING = False  # 디버깅 모드 설정

# MkDocs Macros 설정
def define_env(env):
    """환경 변수 및 매크로 정의"""

    # https://mkdocs-macros-plugin.readthedocs.io/en/latest/macros/#the-define_env-function
    # print( env.conf.data  )
    # print("DEMO:", env.variables.demo ))