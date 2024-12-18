<?php

use Carbon\Carbon;

?>
<div class="card">
    <div class="card-header fw-bold" style="background-color: #ffe6cc; color: #d35400; padding: 12px;">Mục lục</div>
    <div class="card-body" style="background-color: #fff5e6; border: 1px solid #f7d9c4;">
        <div class="overflow-auto ntp_custom_ver_scrollbar" style="height: 500px;">
            <table class="table table-hover">
                <thead>
                    <tr>
                        {{-- <th scope="col">Mã thể loại</th> --}}
                        <th scope="col">Tên chương</th>
                        <th scope="col">Ngày đăng</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">Tình trạng xét duyệt</th>
                        <th scope="col">Trạng thái đăng tải</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($chapters as $key => $chapter)
                        <tr>
                            <td>
                                <a href="{{ route('Chapter.show', [$chapter->id]) }}"
                                    class="title text-decoration-none text-reset fw-bold"> Chương <?php echo $chapter->iChapterNumber; ?>:
                                    {{ $chapter->sChapter }}.
                                </a>
                            </td>
                            <td>
                                <?php
                                // tnpnovel_tnp
                                $time = Carbon::parse($chapter->dCreateDay);
                                $time = $time->locale('Vi');
                                
                                // Tính khoảng thời gian so với thời điểm hiện tại
                                $diff = $time->diffForHumans();
                                
                                echo $diff;
                                ?>
                            </td>
                            <td>{{ $chapter->iPrice }}</td>
                            <td>
                                @if ($chapter->iPublishingStatus == 1)
                                    <span class="text text-success">Đã qua kiểm duyệt</span>
                                @elseif($chapter->iPublishingStatus == 2)
                                    <span class="text text-danger">Không qua kiểm duyệt</span>
                                @elseif($chapter->iPublishingStatus == 0)
                                    <span class="text text-danger">Chưa qua kiểm duyệt</span>
                                @endif
                            </td>
                            <td>
                                @if ($chapter->iStatus == 1)
                                    <span class="text text-success">Đã đăng tải</span>
                                @elseif($chapter->iStatus == 0)
                                    <span class="text text-danger">Đã gỡ bỏ</span>
                                @endif
                            </td>
                            <td>
                                <a class="btn btn-primary" href="{{route('Chapter.page_chitiet_chuong_author',[$chapter->id])}}">Chi tiết chương truyện</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
